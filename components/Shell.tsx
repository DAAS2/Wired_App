import Link from "next/link";
import { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Dashboard", icon: "◈" },
  { href: "/timetable", label: "Timetable", icon: "◌" },
  { href: "/units", label: "Units", icon: "▣" },
  { href: "/tools", label: "Tools", icon: "✦" },
  { href: "/ai-assistant", label: "AI Assistant", icon: "◎" },
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell min-h-screen">
      <div className="mesh-bg" />
      <div className="fixed inset-0 grid-overlay opacity-25 pointer-events-none" />

      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-white/10 bg-slate-950/60 p-6 backdrop-blur-xl md:block">
          <div className="glow-card rounded-3xl p-[1px]">
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/85 p-5">
              <div className="mb-8 flex items-center gap-4">
                <div className="floating flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-500 to-pink-500 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                  M
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-wide text-white">
                    Monash Student Hub
                  </p>
                  <p className="text-xs text-slate-400">
                    Smart campus dashboard
                  </p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3 text-sm text-slate-300 transition-all duration-200 hover:border-blue-400/30 hover:bg-white/[0.05] hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.12)]"
                  >
                    <span className="text-base text-blue-300 transition-transform duration-200 group-hover:scale-125">
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-8 rounded-2xl border border-cyan-400/20 bg-cyan-400/5 p-4 shadow-[0_0_40px_rgba(34,211,238,0.08)]">
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Focus mode
                </p>
                <p className="mt-2 text-sm text-slate-200">
                  Study smarter with Gemini prompts, deadlines, and weekly planning.
                </p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/45 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 py-4 md:px-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
                  Monash University
                </p>
                <h1 className="text-sm font-medium text-slate-100 md:text-base">
                  Student productivity workspace
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="soft-pill hidden rounded-full px-3 py-2 text-xs text-slate-300 md:block">
                  Melbourne · Semester Planner
                </div>
                <button className="neon-button rounded-full px-4 py-2 text-xs font-semibold text-white">
                  Launch AI
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 md:px-8 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}