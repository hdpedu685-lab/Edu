"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function PostSkeleton() {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start gap-3 p-4 pb-0">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <Skeleton className="h-3 w-14" />
          </div>
        </div>

        {/* Content lines */}
        <div className="space-y-2 px-4 pt-4 pb-3">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-3/4" />
        </div>

        {/* Image placeholder (shown on some) */}
        <div className="px-4 pb-3">
          <Skeleton className="aspect-video w-full rounded-xl" />
        </div>

        {/* Stats row */}
        <div className="mx-4 flex items-center justify-between border-b border-slate-100 pb-2">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-24" />
        </div>

        {/* Action bar */}
        <div className="flex items-center gap-1 px-2 py-2">
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}

/* A smaller skeleton without image for variety */
export function PostSkeletonCompact() {
  return (
    <Card className="border border-slate-200 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="flex items-start gap-3 p-4 pb-0">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
        <div className="space-y-2 px-4 pt-4 pb-4">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-5/6" />
        </div>
        <div className="mx-4 flex items-center justify-between border-b border-slate-100 pb-2">
          <Skeleton className="h-3 w-12" />
          <Skeleton className="h-3 w-20" />
        </div>
        <div className="flex items-center gap-1 px-2 py-2">
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
          <Skeleton className="h-8 flex-1 rounded-lg" />
        </div>
      </CardContent>
    </Card>
  )
}
