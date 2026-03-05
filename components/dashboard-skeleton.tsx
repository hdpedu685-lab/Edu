"use client";

import { motion } from "framer-motion";

/**
 * A single shimmering block. Uses a CSS animation for the sweep effect
 * so there is zero JS overhead per-skeleton.
 */
function Bone({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg bg-white/[0.07] ${className}`}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </div>
  );
}

/**
 * Skeleton loader that mirrors the exact Dashboard layout:
 *  - Header banner
 *  - 4 stat cards
 *  - Recent Activity (2-col) + Continue Learning (1-col)
 *
 * Appears instantly so the user sees the "shape" of the page
 * while Supabase data syncs in the background.
 */
export function DashboardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
      className="absolute inset-0"
    >
      {/* ── Header skeleton ── */}
      <section className="border-b border-white/10 py-8 mt-12" style={{ backgroundColor: "rgba(0,0,0,0.15)" }}>
        <div className="mx-auto max-w-7xl px-4">
          <div
            className="rounded-2xl border p-6"
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex-1">
                <Bone className="h-8 w-64 max-w-full rounded-md" />
                <Bone className="mt-2 h-4 w-40 rounded-md" />
              </div>
              <div className="flex items-center gap-3">
                <Bone className="h-9 w-28 rounded-md" />
                <Bone className="h-9 w-24 rounded-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* ── 4 Stat Cards ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border border-white/10 p-6"
              style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            >
              <div className="flex items-center justify-between">
                <Bone className="h-8 w-8 rounded-lg" />
                <Bone className="h-4 w-8 rounded" />
              </div>
              <div className="mt-4">
                <Bone className="h-7 w-16 rounded-md" />
                <Bone className="mt-2 h-4 w-28 rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* ── Activity + Continue Learning ── */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {/* Recent Activity (2/3) */}
          <div
            className="lg:col-span-2 rounded-xl border border-white/10 p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            {/* Card title */}
            <Bone className="mb-5 h-5 w-36 rounded-md" />

            {/* placeholder message row */}
            <div className="text-center">
              <Bone className="mx-auto w-64 h-4" />
              <Bone className="mt-2 mx-auto w-48 h-3" />
            </div>
          </div>

          {/* Continue Learning (1/3) */}
          <div
            className="rounded-xl border border-white/10 p-6"
            style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
          >
            <Bone className="mb-5 h-5 w-40 rounded-md" />

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/10 p-4"
                >
                  <Bone className="h-4 w-36 max-w-full rounded" />
                  <Bone className="mt-2 h-3 w-full rounded" />
                  <Bone className="mt-1 h-3 w-3/4 rounded" />
                  <Bone className="mt-3 h-3 w-20 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
