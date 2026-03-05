"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { TrendingUp, Hash, Users } from "lucide-react"
import { trendingTopics, educators } from "@/lib/blog-data"
import { AuthorHoverCard } from "./author-hover-card"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

/* ─── Left Sidebar: Trending Topics ─── */
export function TrendingSidebar() {
  return (
    <div className="sticky top-20">
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <TrendingUp className="h-4 w-4 text-[#A62A26]" />
            Trending Topics
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <ul className="space-y-1">
            {trendingTopics.map((t) => (
              <li key={t.tag}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2">
                    <Hash className="h-3.5 w-3.5 text-slate-400" />
                    <span className="text-sm font-medium text-slate-700">
                      {t.tag.slice(1)}
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-400">{t.posts} posts</span>
                </button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

/* ─── Right Sidebar: Suggested Educators ─── */
export function SuggestedSidebar() {
  return (
    <div className="sticky top-20">
      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <Users className="h-4 w-4 text-[#A62A26]" />
            Suggested Educators
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <ul className="space-y-3">
            {educators.map((e) => (
              <li key={e.id} className="flex items-center gap-3">
                <AuthorHoverCard author={e}>
                  <Link href={`/u/${e.username}`} className="shrink-0">
                    <Avatar className="h-9 w-9 border-2 border-slate-100 transition-transform hover:scale-105">
                      <AvatarFallback className="bg-[#A62A26] text-xs font-semibold text-white">
                        {getInitials(e.name)}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </AuthorHoverCard>
                <div className="min-w-0 flex-1">
                  <AuthorHoverCard author={e}>
                    <Link
                      href={`/u/${e.username}`}
                      className="block truncate text-sm font-medium text-slate-900 hover:underline"
                    >
                      {e.name}
                    </Link>
                  </AuthorHoverCard>
                  <p className="truncate text-[11px] text-slate-400">
                    {e.subjects[0]}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 shrink-0 border-slate-200 bg-transparent px-3 text-[11px] text-slate-600 hover:border-[#A62A26]/30 hover:text-[#A62A26]"
                >
                  Follow
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
