import { useState } from 'react';
import {
  FileText,
  Sparkles,
  RotateCcw,
  Trash2,
  CheckSquare,
  Gavel,
  CalendarClock,
  AlignLeft,
  ClipboardList,
  User,
  Clock,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Textarea } from '@/components/ui/Field';
import CopyButton from '@/components/ui/CopyButton';
import TypingIndicator from '@/components/ui/TypingIndicator';
import ResponsibleAIBadge from '@/components/ui/ResponsibleAIBadge';
import { summarizeMeeting } from '@/lib/meetingSummarizer';
import type { MeetingSummary } from '@/types';

export default function MeetingNotes() {
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState<MeetingSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = () => {
    if (notes.trim().length < 20) {
      setError('Please paste at least a few sentences of meeting notes to summarize.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const summary = summarizeMeeting(notes);
      setResult(summary);
      setLoading(false);
    }, 1500);
  };

  const handleRegenerate = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      const summary = summarizeMeeting(notes);
      setResult(summary);
      setLoading(false);
    }, 1500);
  };

  const handleClear = () => {
    setNotes('');
    setResult(null);
    setError(null);
  };

  const summaryText = result
    ? `SUMMARY\n${result.summary}\n\nACTION ITEMS\n${result.actionItems
        .map((a) => `- ${a.task}${a.assignee ? ` (Owner: ${a.assignee})` : ''}${a.deadline ? ` (Due: ${a.deadline})` : ''}`)
        .join('\n')}\n\nDECISIONS\n${result.decisions.map((d) => `- ${d}`).join('\n')}\n\nDEADLINES\n${result.deadlines.map((d) => `- ${d}`).join('\n')}`
    : '';

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <FileText size={16} />
          <span>Meeting Notes Summarizer</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Summarize Your Meeting Notes</h1>
        <p className="mt-1.5 text-sm text-neutral-500 sm:text-base">
          Paste meeting transcripts or notes — AI will extract a summary, action items, decisions, and deadlines.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Meeting Notes</CardTitle>
                <CardDescription>Paste or type your meeting notes, transcript, or discussion.</CardDescription>
              </div>
              <Badge variant="primary">Input</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Textarea
              id="notes"
              placeholder="Paste your meeting notes here...&#10;&#10;Example:&#10;Q3 Planning Meeting - Aug 15&#10;Attendees: Sarah, Mike, James, Lisa&#10;&#10;Discussed the product launch timeline. Sarah will send the updated project plan by Friday. Mike agreed to schedule a design review. Decided to prioritize bug fixes over new features this sprint. Deadline for Q3 launch is September 30th..."
              rows={16}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[320px]"
            />

            {error && (
              <div className="rounded-lg border border-error-200 bg-error-50 px-3.5 py-2.5 text-sm text-error-700 animate-fade-in">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-1">
              <Button onClick={handleSummarize} disabled={loading} className="flex-1">
                {loading ? (
                  <>Summarizing...</>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Summarize Meeting
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={loading}>
                <Trash2 size={16} />
                Clear
              </Button>
            </div>
          </CardBody>
        </Card>

        {/* Output */}
        <div className="space-y-4">
          <Card className="animate-fade-in" style={{ animationDelay: '60ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Summary</CardTitle>
                  <CardDescription>Structured breakdown of your meeting.</CardDescription>
                </div>
                <Badge variant="accent">AI Output</Badge>
              </div>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                    <Sparkles size={24} className="text-primary-500 animate-pulse" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-neutral-600">Analyzing meeting notes...</p>
                  <div className="mt-3">
                    <TypingIndicator />
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-5 animate-fade-in-scale">
                  {/* Summary */}
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-50">
                        <AlignLeft size={15} className="text-primary-600" />
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900">Summary</h4>
                    </div>
                    <p className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-3 text-sm leading-relaxed text-neutral-700">
                      {result.summary}
                    </p>
                  </div>

                  <ResponsibleAIBadge compact />

                  <div className="flex flex-wrap gap-2 border-t border-neutral-100 pt-4">
                    <CopyButton text={summaryText} label="Copy Summary" />
                    <Button variant="ghost" size="sm" onClick={handleRegenerate} disabled={loading}>
                      <RotateCcw size={15} />
                      Regenerate
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                    <ClipboardList size={28} className="text-neutral-300" />
                  </div>
                  <p className="mt-4 text-sm font-medium text-neutral-500">Paste your meeting notes to generate a summary.</p>
                  <p className="mt-1 text-xs text-neutral-400">AI will extract action items, decisions, and deadlines.</p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Action Items, Decisions, Deadlines — only when result exists */}
          {result && !loading && (
            <>
              {/* Action Items */}
              <Card className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                <CardBody>
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-success-50">
                      <CheckSquare size={15} className="text-success-600" />
                    </div>
                    <h4 className="text-sm font-semibold text-neutral-900">Action Items</h4>
                    <Badge variant="success" className="ml-auto">{result.actionItems.length}</Badge>
                  </div>
                  <div className="space-y-2.5">
                    {result.actionItems.map((item, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-neutral-200 bg-white p-3.5 transition-colors hover:border-neutral-300"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-success-50 text-[11px] font-bold text-success-700">
                            {i + 1}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-neutral-900">{item.task}</p>
                            <div className="mt-1.5 flex flex-wrap gap-2">
                              {item.assignee && (
                                <Badge variant="neutral">
                                  <User size={11} />
                                  {item.assignee}
                                </Badge>
                              )}
                              {item.deadline && (
                                <Badge variant="warning">
                                  <Clock size={11} />
                                  {item.deadline}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>

              {/* Decisions & Deadlines */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Card className="animate-fade-in" style={{ animationDelay: '140ms' }}>
                  <CardBody>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary-50">
                        <Gavel size={15} className="text-primary-600" />
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900">Decisions</h4>
                    </div>
                    <ul className="space-y-2">
                      {result.decisions.map((d, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-400" />
                          <span className="leading-relaxed">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </CardBody>
                </Card>

                <Card className="animate-fade-in" style={{ animationDelay: '180ms' }}>
                  <CardBody>
                    <div className="mb-3 flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-warning-50">
                        <CalendarClock size={15} className="text-warning-600" />
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-900">Deadlines</h4>
                    </div>
                    {result.deadlines.length > 0 ? (
                      <ul className="space-y-2">
                        {result.deadlines.map((d, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-warning-400" />
                            <span className="leading-relaxed">{d}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-neutral-400">No explicit deadlines detected.</p>
                    )}
                  </CardBody>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
