// components/theme/ThemeProvider.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<boolean>(true);

  // читаем тему из localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved !== null) {
      const parsed = saved === "true"; // строка → boolean
      setTheme(parsed);
      document.body.classList.add(parsed ? "light" : "dark");
    } else {
      document.body.classList.add("light");
    }
  }, []);

  // при изменении темы — обновляем body и localStorage
  useEffect(() => {
    document.body.classList.remove(theme ? "dark" : "light");
    document.body.classList.add(theme ? "light" : "dark");
    localStorage.setItem("theme", String(theme));
  }, [theme]);

  const toggle = () => setTheme((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
