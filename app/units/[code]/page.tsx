import { Shell } from "@/components/Shell";

type UnitPageProps = {
  params: Promise<{ code: string }>; // 👈 note Promise here
};

export default async function UnitPage({ params }: UnitPageProps) {
  const { code } = await params; // 👈 unwrap the Promise
  const upperCode = code.toUpperCase();

  return (
    <Shell>
      <h1 className="text-2xl font-semibold">{upperCode}</h1>
      <p className="mt-2 text-sm text-slate-300">
        Simple detail page for {upperCode}. You can connect this to the Monash handbook or Moodle later.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold">Overview</h2>
          <p className="mt-1 text-xs text-slate-300">
            Add synopsis, learning outcomes, and campus/teaching period info here.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold">Assessments</h2>
          <ul className="mt-1 text-xs text-slate-300 space-y-1">
            <li>Assignment 1 · 15%</li>
            <li>Assignment 2 · 25%</li>
            <li>Exam · 60%</li>
          </ul>
        </div>
      </div>
    </Shell>
  );
}