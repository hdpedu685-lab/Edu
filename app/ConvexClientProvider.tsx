"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import { ConvexReactClient, ConvexProvider } from "convex/react";

/* ── Contexts ── */
const ConvexReadyContext = createContext<boolean>(false);
const ConvexAuthAvailableContext = createContext<boolean>(false);
const ConvexProbingContext = createContext<boolean>(true);

export const useConvexReady = () => useContext(ConvexReadyContext);
export const useConvexAuthAvailable = () => useContext(ConvexAuthAvailableContext);
export const useConvexProbing = () => useContext(ConvexProbingContext);

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const [backendStatus, setBackendStatus] = useState<
    "probing" | "deployed" | "not-deployed"
  >("probing");

  // Memoize the client so it's only created once
  const convex = useMemo(() => {
    if (convexUrl && convexUrl.startsWith("https://")) {
      try {
        return new ConvexReactClient(convexUrl);
      } catch (e) {
        console.error("Convex client initialization failed", e);
        return null;
      }
    }
    return null;
  }, []);

  /* ── Backend Probing Logic ── */
  useEffect(() => {
    if (!convex || !convexUrl) {
      setBackendStatus("not-deployed");
      return;
    }

    async function probe() {
      try {
        const resp = await fetch(`${convexUrl}/api/query`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: "users:currentUser",
            args: {},
            format: "json",
          }),
        });
        const text = await resp.text();

        if (text.toLowerCase().includes("could not find")) {
          setBackendStatus("not-deployed");
        } else {
          setBackendStatus("deployed");
        }
      } catch {
        setBackendStatus("not-deployed");
      }
    }

    probe();
  }, [convex]);

  /* ── Global Promise Rejection Handler ── */
  useEffect(() => {
    function handleRejection(event: PromiseRejectionEvent) {
      const msg = String(event.reason?.message || event.reason || "");
      if (msg.includes("Could not find public function")) {
        event.preventDefault();
      }
    }
    window.addEventListener("unhandledrejection", handleRejection);
    return () => window.removeEventListener("unhandledrejection", handleRejection);
  }, []);

  // 1. Pure Offline Mode (No Convex URL)
  if (!convex) {
    return (
      <ConvexProbingContext value={false}>
        <ConvexAuthAvailableContext value={false}>
          <ConvexReadyContext value={false}>
            {children}
          </ConvexReadyContext>
        </ConvexAuthAvailableContext>
      </ConvexProbingContext>
    );
  }

  // 2. Probing State
  if (backendStatus === "probing") {
    return (
      <ConvexProvider client={convex}>
        <ConvexProbingContext value={true}>
          <ConvexAuthAvailableContext value={false}>
            <ConvexReadyContext value={false}>
              {children}
            </ConvexReadyContext>
          </ConvexAuthAvailableContext>
        </ConvexProbingContext>
      </ConvexProvider>
    );
  }

  // 3. Backend Found but not Deployed (Render plain Provider)
  if (backendStatus === "not-deployed") {
    return (
      <ConvexProvider client={convex}>
        <ConvexProbingContext value={false}>
          <ConvexAuthAvailableContext value={false}>
            <ConvexReadyContext value={false}>
              {children}
            </ConvexReadyContext>
          </ConvexAuthAvailableContext>
        </ConvexProbingContext>
      </ConvexProvider>
    );
  }

  // 4. Fully Deployed (Render plain Provider to avoid auth issues)
  return (
    <ConvexProvider client={convex}>
      <ConvexProbingContext value={false}>
        <ConvexAuthAvailableContext value={false}>
          <ConvexReadyContext value={true}>
            {children}
          </ConvexReadyContext>
        </ConvexAuthAvailableContext>
      </ConvexProbingContext>
    </ConvexProvider>
  );
}