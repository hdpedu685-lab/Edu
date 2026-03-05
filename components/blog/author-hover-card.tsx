"use client"

import Link from "next/link"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"
import type { BlogAuthor } from "@/lib/blog-data"

interface AuthorHoverCardProps {
  author: BlogAuthor | undefined // Added undefined to the type
  children: React.ReactNode
}

const roleColors: Record<string, string> = {
  Educator: "bg-amber-100 text-amber-700 border-amber-200",
  Student: "bg-sky-100 text-sky-700 border-sky-200",
  Admin: "bg-emerald-100 text-emerald-700 border-emerald-200",
}

export function AuthorHoverCard({ author, children }: AuthorHoverCardProps) {
  // 1. Safety Guard: If author is loading/undefined, just render the trigger (children)
  if (!author) return <>{children}</>;

  // 2. Optional Chaining: Safely generate initials
  const initials = author.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "??"; // Fallback initials if name is missing

  const profileHref = `/u/${author.username}`

  return (
    <HoverCard openDelay={300} closeDelay={150}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent
        className="w-72 border border-slate-200 bg-white p-0 shadow-xl"
        align="start"
        sideOffset={8}
      >
        {/* Banner */}
        <div className="h-16 rounded-t-lg bg-gradient-to-r from-[#A62A26] to-[#D4443F]" />

        <div className="px-4 pb-4">
          {/* Avatar overlapping banner */}
          <div className="-mt-8 mb-3">
            <Link href={profileHref}>
              <Avatar className="h-14 w-14 border-[3px] border-white shadow-md transition-transform hover:scale-105">
                <AvatarFallback className="bg-[#A62A26] text-lg font-bold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>

          <div className="flex items-start justify-between gap-2">
            <div>
              <Link
                href={profileHref}
                className="text-sm font-semibold text-slate-900 hover:underline"
              >
                {author.name}
              </Link>
              <p className="text-[11px] text-slate-400">@{author.username}</p>
              <span
                className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] font-medium ${roleColors[author.role] || ""}`}
              >
                {author.role}
              </span>
            </div>
            <Button
              size="sm"
              className="h-7 bg-[#A62A26] px-3 text-[11px] text-white hover:bg-[#8B2220]"
            >
              Follow
            </Button>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            {author.bio}
          </p>

          {/* Added optional chaining for subjects check */}
          {author.subjects && author.subjects.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {author.subjects.map((s) => (
                <span
                  key={s}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                >
                  {s}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
            <Users className="h-3 w-3" />
            <span>{(author.followers || 0).toLocaleString()} followers</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}