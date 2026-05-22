import { Shell } from "@/components/Shell";

export default function ToolsPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">Tools</h1>
      <p className="mt-2 text-sm text-slate-300">
        Handy links and resources for Monash students.
      </p>

      <ul className="mt-6 space-y-3 text-sm">
        <li>
          <a
            href="https://www.monash.edu/library"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 hover:text-blue-200"
          >
            Monash Library
          </a>
        </li>
        <li>
          <a
            href="https://ask.monash.edu"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 hover:text-blue-200"
          >
            Ask.Monash
          </a>
        </li>
        <li>
          <a
            href="https://www.monash.edu/students"
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 hover:text-blue-200"
          >
            Current students
          </a>
        </li>
      </ul>
    </Shell>
  );
}