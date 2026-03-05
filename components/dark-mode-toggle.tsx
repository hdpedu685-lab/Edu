"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function DarkModeToggle() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("dark-mode") === "true";
  });

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
    try {
      localStorage.setItem("dark-mode", enabled ? "true" : "false");
    } catch {}
  }, [enabled]);

  // ensure sync on mount (in case localStorage was set before hydration)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("dark-mode");
    if (stored === "true") setEnabled(true);
  }, []);

  return (
    <button
      aria-label={enabled ? "Disable dark mode" : "Enable dark mode"}
      title={enabled ? "Disable dark mode" : "Enable dark mode"}
      onClick={() => setEnabled((v) => !v)}
      className="fixed left-6 bottom-6 z-50 flex items-center justify-center rounded-full shadow-lg focus:outline-none"
      style={{
        width: 56,
        height: 56,
        backgroundColor: enabled ? "#071A3A" : "#a62a26",
        color: "white",
      }}
    >
      {enabled ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
    </button>
  );
}
