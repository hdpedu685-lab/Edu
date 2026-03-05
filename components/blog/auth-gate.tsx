"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen } from "lucide-react"

export function AuthGate() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Glassmorphism backdrop */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-lg" />

      {/* Card */}
      <Card className="relative z-10 mx-4 w-full max-w-md border border-slate-200 bg-white shadow-2xl">
        <CardHeader className="pb-4 text-center">
          {/* Icon */}
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#A62A26] to-[#D4443F] shadow-lg shadow-[#A62A26]/20">
            <Users className="h-7 w-7 text-white" />
          </div>
          <CardTitle className="text-xl font-semibold text-slate-900">
            Join the Community
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Sign in to share posts, follow educators, and join discussions with thousands of learners.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-6">
          <Link href="/auth" className="block">
            <Button className="w-full bg-[#A62A26] text-white hover:bg-[#8B2220]">
              Sign In
            </Button>
          </Link>
          <Link href="/auth" className="block">
            <Button
              variant="outline"
              className="w-full border-slate-200 bg-transparent text-slate-700 hover:bg-slate-50"
            >
              Create Account
            </Button>
          </Link>

          <div className="flex items-center gap-2 pt-2 text-center">
            <BookOpen className="h-4 w-4 shrink-0 text-slate-400" />
            <p className="text-xs text-slate-400">
              Join 12,000+ students and educators on EduStream
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
