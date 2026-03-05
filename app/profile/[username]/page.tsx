"use client"

import { use } from "react"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, BookOpen, Award } from "lucide-react"
import { educators } from "@/lib/blog-data"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

const roleColors: Record<string, string> = {
  Educator: "bg-amber-100 text-amber-700 border-amber-200",
  Student: "bg-sky-100 text-sky-700 border-sky-200",
  Admin: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export default function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = use(params)
  const author = educators.find((e) => e.username === username)

  if (!author) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-transparent pt-20">
        <Card className="mx-4 w-full max-w-md border border-border bg-background/50 text-center">
          <CardContent className="py-12">
            <p className="text-lg font-semibold text-slate-900">User not found</p>
            <p className="mt-1 text-sm text-slate-500">@{username}</p>
            <Link href="/blog" className="mt-4 inline-block">
              <Button variant="outline" className="bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-transparent pt-20">
      {/* Banner */}
      <div className="h-40 bg-gradient-to-r from-[#A62A26] to-[#D4443F]" />

      <div className="mx-auto max-w-3xl px-4">
        {/* Profile Header */}
        <div className="-mt-16 mb-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-6">
            <Avatar className="h-28 w-28 border-4 border-white shadow-lg">
              <AvatarFallback className="bg-[#A62A26] text-3xl font-bold text-white">
                {getInitials(author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-1">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">{author.name}</h1>
                  <p className="text-sm text-slate-500">@{author.username}</p>
                </div>
                <Button className="w-fit bg-[#A62A26] text-white hover:bg-[#8B2220]">
                  Follow
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="border border-border bg-background/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50">
                <Award className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{author.role}</p>
                <span
                  className={`mt-0.5 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${roleColors[author.role]}`}
                >
                  Verified
                </span>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border bg-background/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50">
                <Users className="h-5 w-5 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {author.followers.toLocaleString()}
                </p>
                <p className="text-xs text-slate-500">Followers</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-border bg-background/50">
            <CardContent className="flex items-center gap-3 p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                <BookOpen className="h-5 w-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {author.subjects.length}
                </p>
                <p className="text-xs text-slate-500">Subjects</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bio */}
        <Card className="mt-4 border border-border bg-background/50">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold text-slate-900">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{author.bio}</p>

            {author.subjects.length > 0 && (
              <div className="mt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Subjects
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {author.subjects.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Back link */}
        <div className="mt-6 pb-12">
          <Link href="/blog">
            <Button variant="outline" className="bg-transparent text-slate-600">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Community
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
