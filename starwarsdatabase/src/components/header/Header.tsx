"use client";

import { useContext, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchForm from "../SearchForm/Searchform";
import "./header.css";
import { ThemeContext } from "../myContext/ThemeContext";

export default function Header() {
  const [isError, setError] = useState(false);
  const context = useContext(ThemeContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  if (!context) {
    throw new Error("Error");
  }

  const { theme, setTheme } = context;

  function Crash() {
    setError(true);
  }

  if (isError) {
    throw new Error("Throw error by button");
  }

  // 👇 эта функция обновляет query-параметр "search" в URL
  function handleSearchChange(query: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`/?${params.toString()}`);
  }

  return (
    <header>
      <div>
        <button onClick={Crash}>Crash System</button>
      </div>
      <div>
        <img
          src="https://fullhdoboi.ru/wp-content/uploads/_ph/4/343729462.jpg"
          alt="starWarsLogo"
          className="StarWarsLogo"
        />
      </div>

      <button onClick={() => setTheme(!theme)}>
        {theme ? "Jedi" : "Sith"}
      </button>

      <SearchForm onSearchChange={handleSearchChange} />
    </header>
  );
}