"use client";
import { useEffect } from "react";
// Revert existing animations before responding to a system preference change.
export function useMotionEffect(setup) {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    let cleanup = setup();
    const update = () => { cleanup?.(); cleanup = setup(); };
    query.addEventListener("change", update);
    return () => { query.removeEventListener("change", update); cleanup?.(); };
  }, [setup]);
}
