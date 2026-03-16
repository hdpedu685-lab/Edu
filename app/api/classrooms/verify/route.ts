import { NextRequest, NextResponse } from 'next/server'
import { liveClassrooms } from '@/lib/classrooms'

const ROOM_PASSWORDS: Record<string, string> = {
  'hdpedu-live': 'hdp123',
  'topik-writing-a2': 'topik2026',
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      roomID?: string
      password?: string
    }

    const roomID = body.roomID?.trim()
    const password = body.password?.trim()

    if (!roomID || !password) {
      return NextResponse.json(
        { ok: false, message: 'Thieu roomID hoac mat khau.' },
        { status: 400 },
      )
    }

    const room = liveClassrooms.find((item) => item.id === roomID && item.isLive)
    if (!room) {
      return NextResponse.json(
        { ok: false, message: 'Phong hoc khong ton tai hoac khong dang live.' },
        { status: 404 },
      )
    }

    const expectedPassword = ROOM_PASSWORDS[roomID]
    if (!expectedPassword || expectedPassword !== password) {
      return NextResponse.json(
        { ok: false, message: 'Mat khau khong dung.' },
        { status: 401 },
      )
    }

    return NextResponse.json({
      ok: true,
      redirectTo: `/courses/classroom/${roomID}`,
    })
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Loi he thong, vui long thu lai.' },
      { status: 500 },
    )
  }
}
