import { AlertTriangle } from 'lucide-react';

interface ResponsibleAIBadgeProps {
  className?: string;
  compact?: boolean;
}

export default function ResponsibleAIBadge({ className = '', compact = false }: ResponsibleAIBadgeProps) {
  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border border-warning-200 bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700 ${className}`}
        role="note"
      >
        <AlertTriangle size={12} className="shrink-0" />
        AI content may contain errors — always review before using.
      </div>
    );
  }
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border border-warning-200 bg-warning-50/60 px-4 py-3 ${className}`}
      role="note"
    >
      <AlertTriangle size={18} className="mt-0.5 shrink-0 text-warning-600" />
      <p className="text-xs leading-relaxed text-warning-800">
        <span className="font-semibold">Responsible AI:</span> AI-generated content may contain
        mistakes or inaccuracies. Always review and verify AI-generated emails, summaries, decisions,
        deadlines, and other information before using or sharing them.
      </p>
    </div>
  );
}
