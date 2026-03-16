'use client'

import { use } from 'react'
import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Load the Jitsi component only on the client — the external_api.js script
// requires a browser environment (window / DOM).
const JitsiMeet = dynamic(() => import('@/components/jitsi-meet'), { ssr: false })

const JAAS_APP_ID = 'vpaas-magic-cookie-acd82c59b18f421aa23114905dfe4ca3'

interface Props {
  params: Promise<{ roomId: string }>
}

export default function ClassroomPage({ params }: Props) {
  const { roomId } = use(params)
  const router = useRouter()

  // Full JaaS room name: "<app-id>/<roomId>"
  const roomName = `${JAAS_APP_ID}/${roomId}`

  useEffect(() => {
    let joined = false

    async function markJoin() {
      const response = await fetch('/api/classrooms/participation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomID: roomId, action: 'join' }),
      })

      if (!response.ok) {
        router.replace('/courses/classroom')
        return
      }

      joined = true
    }

    void markJoin()

    const sendLeave = () => {
      if (!joined) return
      void fetch('/api/classrooms/participation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomID: roomId, action: 'leave' }),
        keepalive: true,
      })
    }

    window.addEventListener('beforeunload', sendLeave)

    return () => {
      window.removeEventListener('beforeunload', sendLeave)
      sendLeave()
    }
  }, [roomId, router])

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Back link — floats above the iframe */}
      <Link
        href="/courses/classroom"
        className="absolute top-4 left-4 z-50 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-sm font-medium text-white backdrop-blur hover:bg-black/80 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại khóa học
      </Link>

      {/* Jitsi fills the entire viewport */}
      <JitsiMeet roomName={roomName} />
    </div>
  )
}
