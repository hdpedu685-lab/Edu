"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { User } from "./types"
import { mockUser } from "./data"


interface UserContextType {
  user: User & { avatarUrl?: string }
  isAuthenticated: boolean
  isLoading: boolean
  isInitialLoad: boolean
  purchaseCourse: (courseId: string) => void
  hasCourseAccess: (courseId: string) => boolean
  signOut: () => Promise<void>
  // Corrected to accept a File object for the profile picture
  updateProfile: (data: { displayName?: string; bio?: string; avatarFile?: File }) => Promise<void>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function ConvexUserProvider({ children }: { children: ReactNode }) {
  // Stubbed user provider without authentication logic.
  return (
    <UserContext.Provider
      value={{
        user: mockUser,
        isAuthenticated: false,
        isLoading: false,
        isInitialLoad: true,
        purchaseCourse: (_id: string) => {},
        hasCourseAccess: (_id: string) => false,
        updateProfile: async () => {},
        signOut: async () => {},
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function UserProvider({ children }: { children: ReactNode }) {
  return <ConvexUserProvider>{children}</ConvexUserProvider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) throw new Error("useUser must be used within a UserProvider")
  return context
}
