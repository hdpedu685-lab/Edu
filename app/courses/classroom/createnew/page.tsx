'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, PlusSquare, LockKeyhole, Type, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'

const copy = {
  vi: {
    back: 'Quay lại danh sách phòng học',
    badge: 'Tạo phòng mới',
    title: 'Tạo lớp học trực tuyến',
    description:
      'Thiết lập tên lớp học và mật khẩu truy cập. Sau khi tạo xong, phòng học sẽ xuất hiện ngay trong danh sách live classroom để học viên tham gia.',
    panelTitle: 'Thiết lập classroom',
    panelBody:
      'Tên lớp học sẽ được chuyển thành room ID để tạo link vào phòng. Hãy dùng tên ngắn, rõ ràng và dễ nhớ.',
    nameLabel: 'Tên lớp học',
    namePlaceholder: 'Ví dụ: Topik speaking buổi tối',
    passwordLabel: 'Mật khẩu phòng học',
    passwordPlaceholder: 'Nhập mật khẩu ít nhất 4 ký tự',
    submitIdle: 'Tạo phòng học',
    submitBusy: 'Đang tạo phòng...',
    helper1: 'Phòng vừa tạo sẽ xuất hiện ngay ở trang classroom.',
    helper2: 'Người học phải nhập đúng mật khẩu ở waiting room mới có thể vào lớp.',
    helper3: 'Khi không còn ai tham gia, phòng sẽ tự bị xóa.',
    defaultError: 'Không thể tạo lớp học.',
    requestError: 'Không thể tạo lớp học lúc này. Vui lòng thử lại.',
  },
  ko: {
    back: '강의실 목록으로 돌아가기',
    badge: '새 강의실 만들기',
    title: '실시간 강의실 생성',
    description:
      '강의실 이름과 입장 비밀번호를 설정하세요. 생성이 완료되면 라이브 classroom 목록에 즉시 표시되어 수강생이 바로 참여할 수 있습니다.',
    panelTitle: '클래스룸 설정',
    panelBody:
      '강의실 이름은 room ID로 변환되어 입장 링크에 사용됩니다. 짧고 명확하며 기억하기 쉬운 이름을 사용하는 것이 좋습니다.',
    nameLabel: '강의실 이름',
    namePlaceholder: '예: 저녁 TOPIK 스피킹',
    passwordLabel: '강의실 비밀번호',
    passwordPlaceholder: '최소 4자리 비밀번호 입력',
    submitIdle: '강의실 만들기',
    submitBusy: '생성 중...',
    helper1: '생성된 방은 classroom 페이지에 바로 표시됩니다.',
    helper2: '수강생은 waiting room에서 올바른 비밀번호를 입력해야 입장할 수 있습니다.',
    helper3: '참가자가 0명이 되면 방은 자동으로 삭제됩니다.',
    defaultError: '강의실을 만들 수 없습니다.',
    requestError: '지금은 강의실을 만들 수 없습니다. 다시 시도해주세요.',
  },
} as const

export default function CreateClassroomPage() {
  const { language } = useLanguage()
  const router = useRouter()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const text = copy[language]

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
        setError(data.message || text.defaultError)
        return
      }

      router.push('/courses/classroom')
      router.refresh()
    } catch {
      setError(text.requestError)
    } finally {
      setIsSubmitting(false)
    }
  }

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
          <div className="grid gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:py-10">
            <div>
              <Link
                href="/courses/classroom"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-white dark:border-white/15 dark:bg-white/5 dark:text-white/85 dark:hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                {text.back}
              </Link>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#a62a26]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#8c1f1b] dark:bg-red-400/10 dark:text-red-300">
                <PlusSquare className="h-3.5 w-3.5" />
                {text.badge}
              </div>

              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight text-[#6f1714] dark:text-white md:text-5xl">
                {text.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 dark:text-white/72 md:text-lg">
                {text.description}
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3 rounded-2xl border border-[#a62a26]/15 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/5">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#a62a26] dark:text-yellow-300" />
                  <p className="text-sm text-slate-700 dark:text-white/72">{text.helper1}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#a62a26]/15 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/5">
                  <LockKeyhole className="mt-0.5 h-5 w-5 text-[#a62a26] dark:text-yellow-300" />
                  <p className="text-sm text-slate-700 dark:text-white/72">{text.helper2}</p>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-[#a62a26]/15 bg-white/72 px-4 py-4 dark:border-white/10 dark:bg-white/5">
                  <PlusSquare className="mt-0.5 h-5 w-5 text-[#a62a26] dark:text-yellow-300" />
                  <p className="text-sm text-slate-700 dark:text-white/72">{text.helper3}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-[#a62a26]/15 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.92),_rgba(255,246,240,0.66))] p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_rgba(255,255,255,0.03))] md:p-7">
              <div className="flex items-center gap-3 text-[#8c1f1b] dark:text-yellow-300">
                <Type className="h-5 w-5" />
                <span className="text-sm font-semibold uppercase tracking-[0.18em]">{text.panelTitle}</span>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-white/65">
                {text.panelBody}
              </p>

              <form onSubmit={handleCreate} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="classroom-name" className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-white/90">
                    {text.nameLabel}
                  </label>
                  <input
                    id="classroom-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-[#a62a26]/15 bg-white/80 px-4 text-slate-900 placeholder:text-slate-400 focus:border-[#a62a26] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-yellow-300"
                    placeholder={text.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="classroom-password" className="mb-1.5 block text-sm font-medium text-slate-800 dark:text-white/90">
                    {text.passwordLabel}
                  </label>
                  <input
                    id="classroom-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={4}
                    className="h-12 w-full rounded-xl border border-[#a62a26]/15 bg-white/80 px-4 text-slate-900 placeholder:text-slate-400 focus:border-[#a62a26] focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-yellow-300"
                    placeholder={text.passwordPlaceholder}
                  />
                </div>

                {error ? <p className="text-sm text-red-500 dark:text-red-300">{error}</p> : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#a62a26] px-4 py-3 font-semibold text-white transition-colors hover:bg-[#8c1f1b] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-yellow-300 dark:text-slate-950 dark:hover:bg-yellow-200"
                >
                  {isSubmitting ? text.submitBusy : text.submitIdle}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
