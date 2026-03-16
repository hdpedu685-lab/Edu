'use client'

import { use } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Load the Jitsi component only on the client — the external_api.js script
// requires a browser environment (window / DOM).
const JitsiMeet = dynamic(() => import('@/components/jitsi-meet'), { ssr: false })

const JAAS_APP_ID = 'vpaas-magic-cookie-acd82c59b18f421aa23114905dfe4ca3'

interface Props {
  params: Promise<{ roomId: string }>
}

export default function ClassroomPage({ params }: Props) {
  const { roomId } = use(params)

  // Full JaaS room name: "<app-id>/<roomId>"
  const roomName = `${JAAS_APP_ID}/${roomId}`

  return (
    <div className="relative h-screen w-screen bg-black overflow-hidden">
      {/* Back link — floats above the iframe */}
      <Link
        href="/courses"
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
