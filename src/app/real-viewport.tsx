"use client";

import { useLayoutEffect } from "react";

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.remove();
  return scrollbarWidth;
}

function onWindowResize() {
  requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--vw",
      `${document.documentElement.offsetWidth * 0.01}px`,
    );
    document.documentElement.style.setProperty(
      "--dvh",
      `${window.innerHeight * 0.01}px`,
    );
    document.documentElement.style.setProperty(
      "--svh",
      `${document.documentElement.clientHeight * 0.01}px`,
    );
    document.documentElement.style.setProperty("--lvh", "1vh");
    document.documentElement.style.setProperty(
      "--scrollbar-width",
      `${getScrollbarWidth()}px`,
    );
  });
}

export function RealViewport() {
  useLayoutEffect(() => {
    window.addEventListener("resize", onWindowResize, false);
    onWindowResize();

    return () => window.removeEventListener("resize", onWindowResize, false);
  }, []);

  return null;
}
