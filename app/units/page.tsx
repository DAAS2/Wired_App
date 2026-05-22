import { Shell } from "@/components/Shell";
import Link from "next/link";

const units = [
  { code: "FIT2004", name: "Algorithms and Data Structures", campus: "Clayton", level: "Intermediate" },
  { code: "FIT2100", name: "Operating Systems", campus: "Clayton", level: "Intermediate" },
  { code: "ATS1234", name: "Example Arts Unit", campus: "Caulfield", level: "Introductory" },
];

export default async function UnitsPage({ params }: { params: Promise<{}> }) {
  await params; // keep async dynamic APIs happy

  return (
    <Shell>
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_60px_rgba(139,92,246,0.14)] md:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Semester plan
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Your units
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Overview of units you&apos;re enrolled in, with quick access to assessments and revision.
            </p>
          </div>
          <div className="soft-pill rounded-full px-3 py-2 text-xs text-slate-300">
            {units.length} units · Demo data
          </div>
        </header>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {units.map((unit) => (
            <Link
              key={unit.code}
              href={`/units/${unit.code}`}
              className="glow-card card-hover flex flex-col rounded-3xl p-[1px]"
            >
              <div className="flex flex-1 flex-col rounded-[calc(1.5rem-1px)] bg-slate-950/90 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    {unit.campus}
                  </p>
                  <span className="rounded-full bg-violet-500/10 px-2 py-1 text-[10px] text-violet-300">
                    {unit.level}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold text-white">
                  {unit.code}
                </h2>
                <p className="mt-1 text-sm text-slate-300">{unit.name}</p>
                <p className="mt-3 text-[11px] text-slate-400">
                  View assessments, exam format, and recommended Gemini prompts.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  );
}