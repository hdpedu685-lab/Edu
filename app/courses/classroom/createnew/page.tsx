'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, PlusSquare } from 'lucide-react'

export default function CreateClassroomPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/classrooms/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, password }),
      })

      const data = (await response.json()) as {
        ok?: boolean
        message?: string
      }

      if (!data.ok) {
        setError(data.message || 'Khong the tao lop hoc.')
        return
      }

      router.push('/courses/classroom')
      router.refresh()
    } catch {
      setError('Khong the tao lop hoc luc nay. Vui long thu lai.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#171717] via-[#111827] to-[#0f172a] text-white">
      <div className="mx-auto max-w-xl px-6 py-14">
        <Link
          href="/courses/classroom"
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/85 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lai danh sach phong hoc
        </Link>

        <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-6 md:p-8 backdrop-blur">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-yellow-300/20 px-3 py-1 text-xs font-semibold text-yellow-200">
              <PlusSquare className="h-3.5 w-3.5" />
              Tao phong hoc moi
            </div>
            <h1 className="mt-3 text-2xl font-bold">Tao lop hoc truc tuyen</h1>
            <p className="mt-1 text-sm text-white/70">
              Nhap ten lop hoc va mat khau. Ten lop hoc se duoc dung lam roomID.
            </p>
          </div>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label htmlFor="classroom-name" className="mb-1.5 block text-sm font-medium text-white/90">
                Ten lop hoc
              </label>
              <input
                id="classroom-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/45 focus:border-yellow-300 focus:outline-none"
                placeholder="Vi du: Topik speaking buoi toi"
              />
            </div>

            <div>
              <label htmlFor="classroom-password" className="mb-1.5 block text-sm font-medium text-white/90">
                Mat khau phong hoc
              </label>
              <input
                id="classroom-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={4}
                className="h-11 w-full rounded-lg border border-white/20 bg-white/10 px-3 text-white placeholder:text-white/45 focus:border-yellow-300 focus:outline-none"
                placeholder="Nhap mat khau"
              />
            </div>

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-yellow-400 px-4 py-2.5 font-semibold text-gray-900 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Dang tao phong...' : 'Tao phong hoc'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
