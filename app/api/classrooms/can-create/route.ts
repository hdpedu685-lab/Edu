import { NextRequest, NextResponse } from 'next/server'
import { ConvexHttpClient } from 'convex/browser'
import { resolveConvexCloudUrl } from '@/lib/convex-env'

export async function GET(request: NextRequest) {
  try {
    const host = request.headers.get('host')
    const convexUrl = resolveConvexCloudUrl({ host })
    const convex = new ConvexHttpClient(convexUrl)

    const authEmailCookie = request.cookies.get('auth_session')?.value
    const authEmail = authEmailCookie ? decodeURIComponent(authEmailCookie).trim() : ''

    if (!authEmail) {
      return NextResponse.json({ ok: true, canCreate: false })
    }

    const canCreate = await convex.query(
      'classroomsAuth:canCreateClassroomByEmail' as any,
      { email: authEmail },
    )

    return NextResponse.json({ ok: true, canCreate: Boolean(canCreate) })
  } catch {
    return NextResponse.json({ ok: true, canCreate: false })
  }
}
