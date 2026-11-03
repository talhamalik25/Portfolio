"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

const subscribe = callback => {
  window.addEventListener("portfolio-theme-change", callback);
  return () => window.removeEventListener("portfolio-theme-change", callback);
};
const snapshot = () => document.documentElement.dataset.theme;
const serverSnapshot = () => null;

export default function ThemeToggle({ className = "" }) {
  const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return <button type="button" data-theme-toggle
    aria-label={theme ? `Switch to ${theme === "dark" ? "light" : "dark"} theme` : "Toggle color theme"}
    onClick={() => window.portfolioTheme.set(document.documentElement.dataset.theme === "dark" ? "light" : "dark")}
    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-outline bg-card text-content transition-colors hover:text-accent-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${className}`}>
    <Sun aria-hidden="true" className="theme-sun h-5 w-5" />
    <Moon aria-hidden="true" className="theme-moon h-5 w-5" />
  </button>;
}
