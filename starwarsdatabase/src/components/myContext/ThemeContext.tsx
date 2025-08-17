// components/theme/ThemeContext.tsx
"use client";

import {createContext, useContext} from "react";
export type ThemeCtx = {
  theme: boolean;
  setTheme: (t: boolean) => void;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeCtx | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider />");
  return ctx;
}
