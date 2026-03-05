"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const WAITING_IMAGES = [
  "/waitingscreen/1.png", "/waitingscreen/2.png", "/waitingscreen/3.png",
  "/waitingscreen/4.png", "/waitingscreen/5.png", "/waitingscreen/6.png",
  "/waitingscreen/7.png", "/waitingscreen/8.png", "/waitingscreen/9.png",
];

interface WaitingScreenProps {
  isLoading: boolean;
  message?: string;
}

export function WaitingScreen({ 
  isLoading, 
  message = "Loading your workspace..." 
}: WaitingScreenProps) {
  const [progress, setProgress] = useState(0);
  // `visible` is the actual render flag. It goes true immediately when isLoading
  // becomes true, and goes false only after BOTH conditions are met:
  //   1. isLoading has become false
  //   2. a minimum display time (2s) has elapsed
  const [visible, setVisible] = useState(isLoading);
  const showTimestamp = useRef<number>(0);

  // Pick a random background image when loading starts
  const backgroundImage = useMemo(() => {
    if (!isLoading) return "";
    return WAITING_IMAGES[Math.floor(Math.random() * WAITING_IMAGES.length)];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const dismiss = useCallback(() => {
    const elapsed = Date.now() - showTimestamp.current;
    const MIN_TIME = 2000;

    if (elapsed >= MIN_TIME) {
      // Min time already passed -- hide now
      setVisible(false);
    } else {
      // Wait for the remaining time, then hide
      const remaining = MIN_TIME - elapsed;
      setTimeout(() => setVisible(false), remaining);
    }
  }, []);

  // Track isLoading changes
  useEffect(() => {
    if (isLoading) {
      // Show the screen, record when it appeared
      setVisible(true);
      setProgress(0);
      showTimestamp.current = Date.now();
    } else {
      // Loading finished -- dismiss with min-time guarantee
      // Only dismiss if we were actually showing (showTimestamp > 0)
      if (showTimestamp.current > 0) {
        dismiss();
      }
    }
  }, [isLoading, dismiss]);

  // Progress bar animation (runs while visible)
  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 25) return prev + 1.5;
        if (prev < 80) return prev + Math.random() * 0.8;
        if (prev < 97) return prev + 0.2;
        return 98;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [visible]);

  const getSubMessage = () => {
    if (progress < 25) return "Initializing connection...";
    if (progress < 80) return "Fetching your data from Supabase...";
    if (progress < 98) return "Synchronizing workspace settings...";
    return "Finalizing synchronization...";
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]"
        >
          {/* Background Image: No cropping, fits screen perfectly */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "contain", // Ensures no part of the image is cropped
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />

          {/* Semi-transparent overlay to ensure text is readable regardless of the random image */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-1" />

          <div className="relative z-10 flex flex-col items-center w-full px-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="backdrop-blur-2xl bg-black/60 border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-6 h-6 border-2 border-white/20 border-t-cyan-400 rounded-full animate-spin" />
                <h2 className="text-white text-xl font-semibold tracking-tight">{message}</h2>
              </div>

              <p className="text-white/60 text-sm h-4 mb-8">{getSubMessage()}</p>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-600"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              <div className="flex justify-between w-full mt-2">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">System Sync</span>
                <span className="text-[10px] text-cyan-400 font-mono">{Math.round(progress)}%</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
