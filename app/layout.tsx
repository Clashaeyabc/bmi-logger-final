import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMI Logger",
  description: "A simple BMI calculator and logger"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <div className="min-h-screen">
          <header className="border-b">
            <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
              <div className="font-semibold">BMI Logger</div>
              <nav className="text-sm flex gap-3">
                <a className="underline" href="/">คำนวณ</a>
                <a className="underline" href="/history">ประวัติ</a>
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>
          <footer className="border-t">
            <div className="mx-auto max-w-4xl px-4 py-4 text-xs text-zinc-600">
              Local-only (localStorage). Export/Import to backup.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}