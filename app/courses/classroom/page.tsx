"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Radio, ArrowRight, PlusSquare } from 'lucide-react'

type LiveRoom = {
  roomID: string
  name: string
  createdAt: number
}

export default function ClassroomListPage() {
  const [streamingRooms, setStreamingRooms] = useState<LiveRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadRooms() {
      try {
        const response = await fetch('/api/classrooms/live', { cache: 'no-store' })
        const data = (await response.json()) as {
          ok?: boolean
          rooms?: LiveRoom[]
        }

        if (data.ok && Array.isArray(data.rooms)) {
          setStreamingRooms(data.rooms)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadRooms()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-12 md:py-16">
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/courses"
              className="inline-flex items-center rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
            >
              Quay lai trang khoa hoc
            </Link>
            <Link
              href="/courses/classroom/createnew"
              className="inline-flex items-center gap-1.5 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-semibold text-gray-900 hover:bg-yellow-300 transition-colors"
            >
              <PlusSquare className="h-4 w-4" />
              Tao classroom
            </Link>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <Radio className="h-5 w-5 text-red-400" />
            <span className="text-sm uppercase tracking-wide text-red-300">Live now</span>
          </div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold">Phong hoc dang streaming</h1>
          <p className="mt-2 text-white/70">
            Chon phong hoc de vao waiting room, nhap mat khau va tham gia lop hoc truc tuyen.
          </p>
        </div>

        {!isLoading && streamingRooms.length === 0 ? (
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold">Không có khóa học nào đang diễn ra</p>
            <p className="mt-2 text-white/70">Vui long quay lai sau.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {streamingRooms.map((room) => (
              <Link
                key={room.roomID}
                href={`/courses/waittingroom/${room.roomID}`}
                className="group rounded-2xl border border-white/15 bg-white/5 p-5 hover:bg-white/10 hover:border-white/30 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{room.name}</h2>
                    <p className="mt-1 text-sm text-white/70">Room ID: {room.roomID}</p>
                  </div>
                  <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-300">
                    LIVE
                  </span>
                </div>
                <div className="mt-4 text-sm text-white/70">
                  Tao luc: {new Date(room.createdAt).toLocaleString('vi-VN')}
                </div>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-yellow-300 group-hover:text-yellow-200">
                  Vao waiting room
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-white/15 bg-white/5 p-8 text-center">
            <p className="text-lg font-semibold">Dang tai danh sach phong hoc...</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
