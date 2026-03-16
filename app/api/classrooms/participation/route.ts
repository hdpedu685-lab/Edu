import { NextRequest, NextResponse } from 'next/server'
import { joinRoom, leaveRoom } from '@/lib/classrooms-store'

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      roomID?: string
      action?: 'join' | 'leave'
    }

    const roomID = body.roomID?.trim()
    const action = body.action

    if (!roomID || (action !== 'join' && action !== 'leave')) {
      return NextResponse.json(
        { ok: false, message: 'Thieu roomID hoac action khong hop le.' },
        { status: 400 },
      )
    }

    const result = action === 'join' ? joinRoom(roomID) : leaveRoom(roomID)
    if (!result) {
      return NextResponse.json(
        { ok: false, message: 'Phong hoc khong ton tai hoac da dong.' },
        { status: 404 },
      )
    }

    return NextResponse.json({ ok: true, ...result })
  } catch {
    return NextResponse.json(
      { ok: false, message: 'Khong cap nhat duoc so nguoi tham gia.' },
      { status: 500 },
    )
  }
}
