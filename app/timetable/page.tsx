import { Shell } from "@/components/Shell";

const mockWeek = [
  { day: "Mon", time: "10:00–12:00", unit: "FIT2004", type: "Lecture", location: "Clayton – 23 College Walk" },
  { day: "Tue", time: "14:00–16:00", unit: "FIT2100", type: "Lab", location: "Clayton – Learning Lab" },
  { day: "Thu", time: "09:00–10:00", unit: "ATS1234", type: "Tutorial", location: "Online (Zoom)" },
];

export default function TimetablePage() {
  return (
    <Shell>
      <div className="flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-slate-950/60 p-6 shadow-[0_0_60px_rgba(59,130,246,0.12)] md:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-slate-400">
              Week overview
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Timetable
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Quick view of where you need to be this week across Monash campuses.
            </p>
          </div>
          <div className="soft-pill flex items-center gap-2 rounded-full px-3 py-2 text-xs text-slate-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            All classes synced · Demo data
          </div>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          {mockWeek.map((item, i) => (
            <div
              key={i}
              className="glow-card card-hover rounded-2xl p-[1px]"
            >
              <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-slate-950/90 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                    {item.day}
                  </span>
                  <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] text-blue-300">
                    {item.type}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-slate-100">
                  {item.unit}
                </p>
                <p className="mt-1 text-xs text-slate-300">{item.time}</p>
                <p className="mt-2 text-[11px] text-slate-400">
                  {item.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card mt-2 rounded-2xl p-4 text-xs text-slate-300">
          Tip: Export your Allocate+ timetable as ICS and later you can wire it into this view for live data.
        </div>
      </div>
    </Shell>
  );
}