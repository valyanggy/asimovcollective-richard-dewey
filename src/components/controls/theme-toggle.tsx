"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [wipeVisible, setWipeVisible] = useState(false);
  const [wipeActive, setWipeActive] = useState(false);
  const [wipeColor, setWipeColor] = useState<"black" | "white">("black");
  const [wipeDirection, setWipeDirection] = useState<"up" | "down">("up");
  const wipeTimeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);

    const savedTheme = window.localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark;

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
  }, []);

  useEffect(() => {
    return () => {
      wipeTimeouts.current.forEach((timeout) => clearTimeout(timeout));
      document.documentElement.classList.remove("theme-transitioning");
    };
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;

    wipeTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    wipeTimeouts.current = [];

    setIsDark(nextIsDark);
    setWipeColor(nextIsDark ? "black" : "white");
    setWipeDirection(nextIsDark ? "up" : "down");
    setWipeVisible(true);
    setWipeActive(false);
    document.documentElement.classList.add("theme-transitioning");

    requestAnimationFrame(() => {
      setWipeActive(true);
    });

    window.localStorage.setItem("theme", nextIsDark ? "dark" : "light");

    wipeTimeouts.current.push(
      setTimeout(() => {
        document.documentElement.classList.toggle("dark", nextIsDark);
      }, 360),
      setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 620),
      setTimeout(() => {
        setWipeVisible(false);
        setWipeActive(false);
      }, 780),
    );
  }

  return (
    <>
      {mounted && wipeVisible
        ? createPortal(
            <div
              aria-hidden="true"
              data-theme-wipe
              className={cn(
                "pointer-events-none fixed inset-0 z-[9999] transform-gpu transition-[opacity,transform] duration-500 ease-out",
                wipeColor === "black" ? "bg-black" : "bg-white",
                wipeDirection === "up" ? "origin-bottom" : "origin-top",
                wipeActive ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
              )}
            />,
            document.body,
          )
        : null}
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "relative inline-flex size-7 shrink-0 items-center justify-center overflow-hidden bg-ink text-canvas transition-opacity hover:opacity-80",
          className,
        )}
        onClick={toggleTheme}
      >
        <Moon
          aria-hidden="true"
          className={cn(
            "absolute transition-[opacity,transform] duration-300 ease-out",
            isDark
              ? "-translate-y-[140%] opacity-0"
              : "translate-y-0 opacity-100",
          )}
          size={14}
        />
        <Sun
          aria-hidden="true"
          className={cn(
            "absolute transition-[opacity,transform] duration-300 ease-out",
            isDark
              ? "translate-y-0 opacity-100"
              : "translate-y-[140%] opacity-0",
          )}
          size={14}
        />
      </button>
    </>
  );
}
