import { NextRequest, NextResponse } from 'next/server'
import { verifyRoomPassword } from '@/lib/classrooms-store'

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

    const verification = verifyRoomPassword(roomID, password)
    if (!verification.ok && verification.reason === 'not_found') {
      return NextResponse.json(
        { ok: false, message: 'Phong hoc khong ton tai hoac khong dang live.' },
        { status: 404 },
      )
    }

    if (!verification.ok && verification.reason === 'wrong_password') {
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
