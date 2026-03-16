"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, PlusSquare, Radio, Users, Clock3, DoorOpen } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

type LiveRoom = {
  roomID: string
  name: string
  createdAt: number
  participantCount: number
}

const copy = {
  vi: {
    back: 'Quay lại trang khóa học',
    create: 'Tạo classroom',
    badge: 'Đang trực tuyến',
    title: 'Phòng học trực tuyến',
    description:
      'Chọn một lớp học đang mở để vào waiting room, nhập mật khẩu và tham gia buổi học trực tiếp với giảng viên.',
    liveCount: 'phòng đang hoạt động',
    loading: 'Đang tải danh sách phòng học...',
    emptyTitle: 'Không có khóa học nào đang diễn ra',
    emptyBody: 'Khi có lớp đang mở, thẻ phòng học sẽ xuất hiện ở đây để học viên tham gia.',
    roomId: 'Room ID',
    createdAt: 'Mở lúc',
    participants: 'người tham gia',
    join: 'Vào waiting room',
    spotlight: 'Live classroom',
  },
  ko: {
    back: '강좌 페이지로 돌아가기',
    create: '클래스룸 만들기',
    badge: '라이브 진행 중',
    title: '실시간 온라인 강의실',
    description:
      '진행 중인 강의실을 선택한 뒤 대기실에서 비밀번호를 입력하고 강사와 실시간으로 수업에 참여하세요.',
    liveCount: '개의 강의실이 진행 중',
    loading: '강의실 목록을 불러오는 중입니다...',
    emptyTitle: '현재 진행 중인 강좌가 없습니다',
    emptyBody: '라이브 강의가 열리면 이곳에 카드가 표시되어 바로 입장할 수 있습니다.',
    roomId: '룸 ID',
    createdAt: '개설 시간',
    participants: '참가자',
    join: '대기실 입장',
    spotlight: '실시간 클래스룸',
  },
} as const

export default function ClassroomListPage() {
  const { language } = useLanguage()
  const backendUser = useQuery(api.users.currentUser)
  const [streamingRooms, setStreamingRooms] = useState<LiveRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const text = copy[language]
  const isExpert = String((backendUser as any)?.role || '').toLowerCase() === 'expert'

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
    <div className="min-h-screen text-slate-900 dark:text-white">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-fixed dark:hidden"
        style={{ backgroundImage: 'url(/bg-course.png)' }}
      />
      <div
        className="fixed inset-0 -z-20 hidden bg-cover bg-center bg-fixed dark:block"
        style={{ backgroundImage: 'url(/dark-mode.png)' }}
      />

      <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <section className="overflow-hidden rounded-[2rem] border border-white/60 bg-white/55 shadow-[0_24px_80px_rgba(124,45,18,0.14)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.3fr_0.9fr] md:px-10 md:py-10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/courses"
                  className="inline-flex items-center rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
                >
                  {text.back}
                </Link>
                <Link
                  href={isExpert ? '/courses/classroom/createnew' : '#'}
                  aria-disabled={!isExpert}
                  onClick={(e) => {
                    if (!isExpert) e.preventDefault()
                  }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isExpert
                      ? 'bg-[#a62a26] text-white hover:bg-[#8c1f1b] dark:bg-yellow-300 dark:text-slate-950 dark:hover:bg-yellow-200'
                      : 'cursor-not-allowed bg-slate-300/70 text-slate-500 dark:bg-white/10 dark:text-white/35'
                  }`}
                >
                  <PlusSquare className="h-4 w-4" />
                  {text.create}
                </Link>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#a62a26]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8c1f1b] dark:bg-red-400/10 dark:text-red-300">
                <Radio className="h-3.5 w-3.5" />
                {text.spotlight}
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#6f1714] dark:text-white md:text-5xl">
                {text.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-white/72 md:text-lg">
                {text.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-[#a62a26]/15 bg-white/72 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <div className="text-2xl font-black text-[#a62a26] dark:text-yellow-300">{streamingRooms.length}</div>
                  <div className="text-sm text-slate-600 dark:text-white/65">{text.liveCount}</div>
                </div>
                <div className="rounded-2xl border border-[#a62a26]/15 bg-white/72 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                  <div className="text-2xl font-black text-[#a62a26] dark:text-yellow-300">
                    {streamingRooms.reduce((sum, room) => sum + room.participantCount, 0)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-white/65">{text.participants}</div>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#a62a26]/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(255,246,240,0.66))] p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))]">
              <div className="flex items-center gap-3 text-[#8c1f1b] dark:text-yellow-300">
                <DoorOpen className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">{text.badge}</span>
              </div>
              <div className="mt-5 space-y-4">
                {streamingRooms.slice(0, 3).map((room) => (
                  <div
                    key={room.roomID}
                    className="rounded-2xl border border-[#a62a26]/10 bg-white/70 p-4 dark:border-white/10 dark:bg-white/5"
                  >
                    <div className="font-semibold text-slate-900 dark:text-white">{room.name}</div>
                    <div className="mt-1 text-sm text-slate-600 dark:text-white/65">{text.roomId}: {room.roomID}</div>
                    <div className="mt-3 flex items-center justify-between text-sm text-slate-600 dark:text-white/65">
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {room.participantCount} {text.participants}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock3 className="h-4 w-4" />
                        {new Date(room.createdAt).toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'ko-KR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {!isLoading && streamingRooms.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-[#a62a26]/20 bg-white/55 p-6 text-center dark:border-white/10 dark:bg-white/5">
                    <p className="font-semibold text-slate-900 dark:text-white">{text.emptyTitle}</p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-white/65">{text.emptyBody}</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {isLoading ? (
            <div className="rounded-[1.75rem] border border-white/60 bg-white/55 p-8 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 xl:col-span-3">
              <p className="text-lg font-semibold text-slate-900 dark:text-white">{text.loading}</p>
            </div>
          ) : null}

          {!isLoading && streamingRooms.length === 0 ? (
            <div className="rounded-[1.75rem] border border-white/60 bg-white/55 p-8 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45 xl:col-span-3">
              <p className="text-xl font-bold text-slate-900 dark:text-white">{text.emptyTitle}</p>
              <p className="mt-3 text-slate-600 dark:text-white/65">{text.emptyBody}</p>
            </div>
          ) : null}

          {!isLoading
            ? streamingRooms.map((room) => (
                <Link
                  key={room.roomID}
                  href={`/courses/waittingroom/${room.roomID}`}
                  className="group rounded-[1.75rem] border border-white/70 bg-white/60 p-6 shadow-[0_20px_60px_rgba(124,45,18,0.12)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/78 dark:border-white/10 dark:bg-slate-950/45 dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:hover:bg-slate-950/60"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a62a26] dark:text-yellow-300">{text.badge}</p>
                      <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{room.name}</h2>
                    </div>
                    <span className="rounded-full bg-[#a62a26]/10 px-3 py-1 text-xs font-semibold text-[#8c1f1b] dark:bg-red-400/10 dark:text-red-300">
                      LIVE
                    </span>
                  </div>

                  <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-white/65">
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/5">
                      <span>{text.roomId}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{room.roomID}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/5">
                      <span className="inline-flex items-center gap-2"><Users className="h-4 w-4" />{text.participants}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">{room.participantCount}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 dark:bg-white/5">
                      <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{text.createdAt}</span>
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {new Date(room.createdAt).toLocaleString(language === 'vi' ? 'vi-VN' : 'ko-KR')}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#a62a26] transition-colors group-hover:text-[#7f201d] dark:text-yellow-300 dark:group-hover:text-yellow-200">
                    {text.join}
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </Link>
              ))
            : null}
        </section>
      </div>
    </div>
  )
}
