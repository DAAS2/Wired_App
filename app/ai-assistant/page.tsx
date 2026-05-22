import { Shell } from "@/components/Shell";
import { AiChat } from "@/components/AiChat";

export default function AiAssistantPage() {
  return (
    <Shell>
      <h1 className="text-2xl font-semibold">AI study assistant</h1>
      <p className="mt-2 text-sm text-slate-300">
        Powered by Gemini. Ask questions about your units, concepts you&apos;re stuck on, or how to plan for assessments.
      </p>

      <div className="mt-6">
        <AiChat />
      </div>
    </Shell>
  );
}