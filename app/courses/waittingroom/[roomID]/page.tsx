'use client'

import { FormEvent, use, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Lock, ArrowLeft } from 'lucide-react'
import { liveClassrooms } from '@/lib/classrooms'

interface Props {
  params: Promise<{ roomID: string }>
}

export default function WaitingRoomPage({ params }: Props) {
  const { roomID } = use(params)
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const room = useMemo(
    () => liveClassrooms.find((item) => item.id === roomID),
    [roomID],
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/classrooms/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomID, password }),
      })

      const data = (await response.json()) as {
        ok?: boolean
        message?: string
        redirectTo?: string
      }

      if (data.ok && data.redirectTo) {
        router.push(data.redirectTo)
        return
      }

      setError(data.message || 'Mat khau khong dung. Vui long thu lai.')
    } catch {
      setError('Khong the xac thuc mat khau luc nay. Vui long thu lai.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1220] via-[#111827] to-[#1f2937] text-white">
      <div className="mx-auto max-w-xl px-6 py-14">
        <Link
          href="/courses/classroom"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/85 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lai danh sach phong hoc
        </Link>

        <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur">
          <div className="mb-5">
            <p className="text-xs uppercase tracking-wide text-white/60">Waiting Room</p>
            <h1 className="mt-2 text-2xl font-bold">{room?.title || 'Lop hoc truc tuyen'}</h1>
            <p className="mt-1 text-sm text-white/70">
              Nhap mat khau phong de vao lop hoc.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label htmlFor="room-password" className="block text-sm font-medium text-white/90">
              Mat khau phong hoc
            </label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
              <input
                id="room-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-white/20 bg-white/10 pl-10 pr-3 text-white placeholder:text-white/45 focus:border-yellow-300 focus:outline-none"
                placeholder="Nhap mat khau"
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-gray-900 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Dang kiem tra...' : 'Vao lop hoc'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
