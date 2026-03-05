"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ClientScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "smooth" if you want a sliding effect
    })
  }, [pathname])

  return null
}
