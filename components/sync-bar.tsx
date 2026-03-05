"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SyncBarProps {
  /** true while data is still being fetched / synced */
  isSyncing: boolean;
  /** Optional label shown in the bottom-right indicator */
  label?: string;
}

/**
 * Facebook-style non-blocking sync UI.
 * - 3px gradient bar at the very top of the viewport.
 * - Non-linear progress: fast 0-60, slow 60-90, stalls at 98.
 * - When sync finishes: glows, fills to 100%, slides up & fades out.
 * - Small "Syncing..." pill in the bottom-right corner.
 * - Never blocks user interaction.
 */
export function SyncBar({ isSyncing, label = "Syncing..." }: SyncBarProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [completed, setCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start syncing
  useEffect(() => {
    if (isSyncing) {
      setVisible(true);
      setCompleted(false);
      setProgress(0);

      // Non-linear progress tick
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) return prev + 2;                    // Fast: 0-30
          if (prev < 60) return prev + 1.2;                  // Medium: 30-60
          if (prev < 85) return prev + Math.random() * 0.5;  // Slow: 60-85
          if (prev < 97) return prev + 0.15;                 // Crawl: 85-97
          return 98;                                          // Stall at 98
        });
      }, 60);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSyncing]);

  // Finish syncing: fill to 100%, glow, then fade out
  const handleComplete = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(100);
    setCompleted(true);

    // Let the 100% + glow be visible briefly, then hide
    const t = setTimeout(() => {
      setVisible(false);
      setCompleted(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!isSyncing && visible && !completed) {
      // Sync just finished while bar is visible
      const cleanup = handleComplete();
      return cleanup;
    }
  }, [isSyncing, visible, completed, handleComplete]);

  return (
    <>
      {/* ── Top Sync Bar ── */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3, transition: { duration: 0.4, ease: "easeInOut" } }}
            className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none"
            style={{ height: "3px" }}
          >
            {/* Track */}
            <div className="h-full w-full bg-white/5">
              {/* Fill */}
              <motion.div
                className="h-full origin-left"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                  background: completed
                    ? "linear-gradient(90deg, #06b6d4, #3b82f6, #06b6d4)"
                    : "linear-gradient(90deg, #06b6d4, #3b82f6)",
                  boxShadow: completed
                    ? "0 0 16px rgba(6,182,212,0.8), 0 0 32px rgba(59,130,246,0.5)"
                    : "0 0 8px rgba(6,182,212,0.5), 0 0 16px rgba(59,130,246,0.3)",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Bottom-right "Syncing..." pill ── */}
      <AnimatePresence>
        {visible && !completed && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.3 } }}
            className="fixed bottom-6 right-6 z-[9998] pointer-events-none"
          >
            <div className="flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium text-white/80 border border-white/10 backdrop-blur-xl"
              style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
            >
              {/* Animated spinner dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


/**
 * Full-screen "Initializing" state for first-time users with no cached data.
 * Beautiful centered card with spinner -- only shown once, briefly.
 */
export function InitializingScreen({ message = "Setting up your workspace..." }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[9998] flex items-center justify-center"
      style={{ backgroundColor: "rgba(5,5,15,0.95)" }}
    >
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-white/10 px-10 py-8 backdrop-blur-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
      >
        {/* Spinner ring */}
        <div className="relative h-10 w-10">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 animate-spin" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-white/90 tracking-tight">{message}</p>
          <p className="mt-1 text-xs text-white/40">This only happens once</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
