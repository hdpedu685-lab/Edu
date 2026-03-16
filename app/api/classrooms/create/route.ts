import { NextRequest, NextResponse } from 'next/server'
import { createRoom } from '@/lib/classrooms-store'

export async function POST(request: NextRequest) {
  try {
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
