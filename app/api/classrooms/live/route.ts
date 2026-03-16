import { NextResponse } from 'next/server'
import { listLiveRooms } from '@/lib/classrooms-store'

export async function GET() {
  return NextResponse.json({ ok: true, rooms: listLiveRooms() })
}
