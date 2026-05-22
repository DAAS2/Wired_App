import Link from "next/link";
import { Shell } from "@/components/Shell";

const cards = [
  {
    title: "Timetable",
    desc: "Track classes, labs, rooms and your next campus move.",
    href: "/timetable",
    glow: "from-cyan-400 via-blue-500 to-violet-500",
  },
  {
    title: "Units",
    desc: "Open enrolled units, assessments and study snapshots.",
    href: "/units",
    glow: "from-blue-500 via-violet-500 to-pink-500",
  },
  {
    title: "AI Assistant",
    desc: "Use Gemini to explain content, draft plans and revise faster.",
    href: "/ai-assistant",
    glow: "from-pink-500 via-violet-500 to-cyan-400",
  },
];

export default function Page() {
  return (
    <Shell>
      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/40 p-6 shadow-[0_0_80px_rgba(59,130,246,0.08)] md:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.18),transparent_20%),radial-gradient(circle_at_60%_80%,rgba(34,211,238,0.14),transparent_20%)]" />
        <div className="relative z-10 max-w-3xl">
          <div className="soft-pill inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-cyan-300">
            Monash student system
          </div>
          <h2 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-6xl">
            A glowing, smarter dashboard for uni life.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
            Manage timetable, units, tools and AI support in one polished experience built for Monash students in Melbourne.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/ai-assistant"
              className="neon-button rounded-full px-6 py-3 text-sm font-semibold text-white"
            >
              Open Gemini Assistant
            </Link>
            <Link
              href="/units"
              className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-slate-200 transition hover:bg-white/10"
            >
              View Units
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="glow-card card-hover rounded-3xl p-[1px]"
          >
            <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/85 p-5">
              <div className={`h-1.5 w-20 rounded-full bg-gradient-to-r ${card.glow}`} />
              <h3 className="mt-5 text-lg font-semibold text-white">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{card.desc}</p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.25em] text-slate-500">
                  Enter
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-300">
                  Open →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Weekly energy
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                This week at Monash
              </h3>
            </div>
            <div className="pulse-glow rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              Live
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Stat title="Classes" value="06" accent="text-cyan-300" />
            <Stat title="Assessments" value="03" accent="text-pink-300" />
            <Stat title="Focus hours" value="14" accent="text-violet-300" />
          </div>
        </div>

        <div className="glow-card rounded-3xl p-[1px]">
          <div className="rounded-[calc(1.5rem-1px)] bg-slate-950/85 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Quick links
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <a className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10" href="https://my.monash.edu" target="_blank" rel="noreferrer">
                my.monash
              </a>
              <a className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10" href="https://lms.monash.edu" target="_blank" rel="noreferrer">
                Moodle / LMS
              </a>
              <a className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 transition hover:bg-white/10" href="https://timetable.monash.edu" target="_blank" rel="noreferrer">
                Timetable
              </a>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function Stat({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{title}</p>
      <p className={`mt-3 text-3xl font-semibold ${accent}`}>{value}</p>
    </div>
  );
}