import { NextRequest, NextResponse } from 'next/server'
import { createRoom } from '@/lib/classrooms-store'
import { ConvexHttpClient } from 'convex/browser'
import { resolveConvexCloudUrl } from '@/lib/convex-env'

export async function POST(request: NextRequest) {
  try {
    const host = request.headers.get('host')
    const convexUrl = resolveConvexCloudUrl({ host })
    const convex = new ConvexHttpClient(convexUrl)

    const authEmailCookie = request.cookies.get('auth_session')?.value
    const authEmail = authEmailCookie ? decodeURIComponent(authEmailCookie).trim() : ''

    if (!authEmail) {
      return NextResponse.json(
        { ok: false, message: 'Vui long dang nhap de tao classroom.' },
        { status: 401 },
      )
    }

    const isExpert = await convex.query(
      'classroomsAuth:canCreateClassroomByEmail' as any,
      { email: authEmail },
    )

    if (!isExpert) {
      return NextResponse.json(
        { ok: false, message: 'Chi tai khoan Expert moi duoc tao classroom.' },
        { status: 403 },
      )
    }

    const body = (await request.json()) as {
      name?: string
      password?: string
    }

    const name = body.name?.trim() || ''
    const password = body.password?.trim() || ''

    const room = createRoom(name, password)
    return NextResponse.json({ ok: true, room })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Khong the tao lop hoc.'
    return NextResponse.json({ ok: false, message }, { status: 400 })
  }
}
