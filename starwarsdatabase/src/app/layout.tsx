// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import ThemeProvider from "@/components/myContext/myContext";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function RootLayout({
  children,   // на всякий случай (не используем в этом раскладе)
  cards,      // содержимое из app/@cards/*
  details,    // содержимое из app/@details/*
}: {
  children: ReactNode;
  cards: ReactNode;
  details: ReactNode;
}) {
  const hasDetails = !!details; // default.tsx в @details должен возвращать null
  console.log(hasDetails)
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <Header />

          <main
            className="shell"
            style={{
              display: "flex",
              gap: "24px",
              alignItems: "flex-start",
              // если есть правая панель — две колонки 50/50, иначе левая на 100%
              justifyContent: hasDetails ? "space-between" : "center",
            }}
          >
            <section
              style={{
                flex: hasDetails ? "0 0 50%" : "0 1 100%",
                maxWidth: hasDetails ? "50%" : "100%",
              }}
            >
              {cards /* список карточек */}
            </section>

            {hasDetails && (
              <aside
                style={{
                  flex: "0 0 50%",
                  maxWidth: "50%",
                }}
              >
                {details /* правая панель (детали) */}
              </aside>
            )}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
