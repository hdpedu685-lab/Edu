"use client"

import React, { useEffect, useState, useRef } from "react"
import { usePathname } from "next/navigation"
import { SyncBar } from "@/components/sync-bar"

export function RouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  
  const prevPathnameRef = useRef(pathname)
  const isFirstRender = useRef(true)

  // When pathname changes, navigation is complete
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevPathnameRef.current = pathname
      return
    }

    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname
      const t = setTimeout(() => setIsNavigating(false), 100)
      return () => clearTimeout(t)
    }
  }, [pathname])

  // Intercept <a> clicks for internal routes
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a")
      if (!anchor) return

      const href = anchor.getAttribute("href")
      if (!href || !href.startsWith("/") || href.startsWith("//") || href.startsWith("#")) return

      const normalize = (p: string) => p.replace(/\/$/, "") || "/"
      if (normalize(href.split("?")[0]) === normalize(pathname)) return

      setIsNavigating(true)
    }

    document.addEventListener("click", handleClick, true)
    return () => document.removeEventListener("click", handleClick, true)
  }, [pathname])

  // Safety timeout
  useEffect(() => {
    if (!isNavigating) return
    const t = setTimeout(() => setIsNavigating(false), 6000)
    return () => clearTimeout(t)
  }, [isNavigating])

  return (
    <>
      <SyncBar isSyncing={isNavigating} label="Navigating..." />
      {children}
    </>
  )
}
