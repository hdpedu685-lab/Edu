'use client'

import { useEffect, useRef } from 'react'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface JitsiAPI {
  addEventListener: (
    event: string,
    handler: (data: Record<string, unknown>) => void,
  ) => void
  dispose: () => void
}

declare global {
  interface Window {
    JitsiMeetExternalAPI: new (
      domain: string,
      options: Record<string, unknown>,
    ) => JitsiAPI
  }
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const JAAS_APP_ID = 'vpaas-magic-cookie-acd82c59b18f421aa23114905dfe4ca3'
const SCRIPT_SRC = `https://8x8.vc/${JAAS_APP_ID}/external_api.js`
const SCRIPT_ID = 'jaas-external-api'
const LS_NAME_KEY = 'hdp_edu_name'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface JitsiMeetProps {
  /**
   * Full JaaS room name, e.g.
   * "vpaas-magic-cookie-acd82c59b18f421aa23114905dfe4ca3/YourRoomName"
   */
  roomName: string
}

export default function JitsiMeet({ roomName }: JitsiMeetProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const apiRef = useRef<JitsiAPI | null>(null)

  useEffect(() => {
    let cancelled = false

    function initApi() {
      if (cancelled || !containerRef.current || apiRef.current) return

      const savedName = localStorage.getItem(LS_NAME_KEY)
      const hasSavedName = savedName !== null && savedName.length > 0

      const options: Record<string, unknown> = {
        roomName,
        parentNode: containerRef.current,
        // Skip the pre-join setup screen if we already know the user's name
        prejoinPageEnabled: !hasSavedName,
        ...(hasSavedName ? { userInfo: { displayName: savedName } } : {}),
      }

      apiRef.current = new window.JitsiMeetExternalAPI('8x8.vc', options)

      // Persist the display name whenever the user sets or changes it inside Jitsi.
      // The Jitsi payload uses lowercase "displayname".
      apiRef.current.addEventListener('displayNameChange', (data) => {
        const name =
          (data.displayname as string | undefined) ||
          (data.displayName as string | undefined)
        if (name) {
          localStorage.setItem(LS_NAME_KEY, name)
        }
      })
    }

    // If the script is already loaded and the constructor is available, init immediately.
    if (typeof window.JitsiMeetExternalAPI !== 'undefined') {
      initApi()
    } else {
      // Re-use an existing script tag (e.g. from a previous render) to avoid
      // loading the same script twice.
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null

      if (!script) {
        script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = SCRIPT_SRC
        script.async = true
        document.head.appendChild(script)
      }

      // Wait for the script to finish loading before initializing the API.
      script.addEventListener('load', initApi)
      const scriptRef = script

      return () => {
        cancelled = true
        scriptRef.removeEventListener('load', initApi)
        apiRef.current?.dispose()
        apiRef.current = null
      }
    }

    return () => {
      cancelled = true
      apiRef.current?.dispose()
      apiRef.current = null
    }
  }, [roomName])

  return (
    <div
      ref={containerRef}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
