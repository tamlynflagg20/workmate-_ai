import { useState } from 'react';
import {
  Mail,
  Sparkles,
  RotateCcw,
  Trash2,
  Edit3,
  Check,
  X,
  Send,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Input, Textarea, Select } from '@/components/ui/Field';
import CopyButton from '@/components/ui/CopyButton';
import TypingIndicator from '@/components/ui/TypingIndicator';
import ResponsibleAIBadge from '@/components/ui/ResponsibleAIBadge';
import { generateEmail } from '@/lib/emailGenerator';
import type { EmailInput, EmailGeneration, Tone, EmailLength } from '@/types';

const toneOptions: { value: Tone; label: string }[] = [
  { value: 'formal', label: 'Formal' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'persuasive', label: 'Persuasive' },
];

const lengthOptions: { value: EmailLength; label: string }[] = [
  { value: 'short', label: 'Short — 1-2 sentences' },
  { value: 'medium', label: 'Medium — 1 paragraph' },
  { value: 'long', label: 'Long — Detailed' },
];

export default function EmailGenerator() {
  const [input, setInput] = useState<EmailInput>({
    recipient: '',
    purpose: '',
    keyInfo: '',
    tone: 'formal',
    length: 'medium',
  });
  const [result, setResult] = useState<EmailGeneration | null>(null);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!input.purpose.trim() && !input.keyInfo.trim()) {
      setError('Please describe the purpose or key information for your email.');
      return;
    }
    setError(null);
    setLoading(true);
    setResult(null);
    setEditing(false);
    setTimeout(() => {
      const generated = generateEmail(input);
      setResult(generated);
      setLoading(false);
    }, 1200);
  };

  const handleRegenerate = () => {
    setLoading(true);
    setResult(null);
    setEditing(false);
    setTimeout(() => {
      const generated = generateEmail(input);
      setResult(generated);
      setLoading(false);
    }, 1200);
  };

  const handleClear = () => {
    setInput({ recipient: '', purpose: '', keyInfo: '', tone: 'formal', length: 'medium' });
    setResult(null);
    setEditing(false);
    setError(null);
  };

  const startEdit = () => {
    if (!result) return;
    const fullText = `${result.greeting}\n\n${result.body}\n\n${result.closing}`;
    setEditText(fullText);
    setEditing(true);
  };

  const saveEdit = () => {
    if (!result) return;
    const parts = editText.split(/\n\n/);
    const greeting = parts[0] || result.greeting;
    const closing = parts[parts.length - 1] || result.closing;
    const body = parts.slice(1, -1).join('\n\n') || result.body;
    setResult({ ...result, greeting, body, closing });
    setEditing(false);
  };

  const fullEmailText = result
    ? `Subject: ${result.subject}\n\n${result.greeting}\n\n${result.body}\n\n${result.closing}`
    : '';

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <Mail size={16} />
          <span>Smart Email Generator</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Generate a Professional Email</h1>
        <p className="mt-1.5 text-sm text-neutral-500 sm:text-base">
          Describe what you need — Workmate AI will craft a polished, workplace-appropriate email.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Email Details</CardTitle>
                <CardDescription>Tell the AI what the email should communicate.</CardDescription>
              </div>
              <Badge variant="primary">Input</Badge>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <Input
              id="recipient"
              label="Recipient / Context"
              placeholder="e.g. Sarah Chen, Marketing Director"
              value={input.recipient}
              onChange={(e) => setInput({ ...input, recipient: e.target.value })}
            />
            <Input
              id="purpose"
              label="Email Purpose"
              placeholder="e.g. Request a project status update"
              value={input.purpose}
              onChange={(e) => setInput({ ...input, purpose: e.target.value })}
            />
            <Textarea
              id="keyInfo"
              label="Key Information"
              placeholder="Include any specific details, points, or context the email should cover..."
              rows={5}
              value={input.keyInfo}
              onChange={(e) => setInput({ ...input, keyInfo: e.target.value })}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Select
                id="tone"
                label="Tone"
                value={input.tone}
                onChange={(e) => setInput({ ...input, tone: e.target.value as Tone })}
              >
                {toneOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
              <Select
                id="length"
                label="Length"
                value={input.length}
                onChange={(e) => setInput({ ...input, length: e.target.value as EmailLength })}
              >
                {lengthOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </Select>
            </div>

            {error && (
              <div className="rounded-lg border border-error-200 bg-error-50 px-3.5 py-2.5 text-sm text-error-700 animate-fade-in">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button onClick={handleGenerate} disabled={loading} className="flex-1">
                {loading ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Generate Email
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
        <Card className="animate-fade-in" style={{ animationDelay: '60ms' }}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Generated Email</CardTitle>
                <CardDescription>Review, copy, edit, or regenerate.</CardDescription>
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
                <p className="mt-4 text-sm font-medium text-neutral-600">Crafting your email...</p>
                <div className="mt-3">
                  <TypingIndicator />
                </div>
              </div>
            ) : result ? (
              <div className="space-y-4 animate-fade-in-scale">
                {!editing && (
                  <>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400">Subject</p>
                      <p className="mt-0.5 text-sm font-medium text-neutral-900">{result.subject}</p>
                    </div>

                    <div className="rounded-lg border border-neutral-200 bg-white p-4">
                      <div className="space-y-3 text-sm leading-relaxed text-neutral-700">
                        <p className="font-medium text-neutral-900">{result.greeting}</p>
                        <div className="whitespace-pre-wrap">{result.body}</div>
                        <div className="whitespace-pre-wrap pt-2 text-neutral-600">{result.closing}</div>
                      </div>
                    </div>
                  </>
                )}

                {editing && (
                  <div className="space-y-3 animate-fade-in">
                    <label className="block text-sm font-medium text-neutral-700">Edit Email Content</label>
                    <textarea
                      className="w-full resize-none rounded-lg border border-neutral-300 bg-white px-3.5 py-3 text-sm leading-relaxed text-neutral-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
                      rows={14}
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                  </div>
                )}

                <ResponsibleAIBadge compact />

                <div className="flex flex-wrap items-center gap-2 border-t border-neutral-100 pt-4">
                  {!editing ? (
                    <>
                      <CopyButton text={fullEmailText} label="Copy" />
                      <Button variant="ghost" size="sm" onClick={handleRegenerate} disabled={loading}>
                        <RotateCcw size={15} />
                        Regenerate
                      </Button>
                      <Button variant="ghost" size="sm" onClick={startEdit}>
                        <Edit3 size={15} />
                        Edit
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button size="sm" onClick={saveEdit}>
                        <Check size={15} />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
                        <X size={15} />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                  <Mail size={28} className="text-neutral-300" />
                </div>
                <p className="mt-4 text-sm font-medium text-neutral-500">Your AI-generated email will appear here.</p>
                <p className="mt-1 text-xs text-neutral-400">Fill in the details and click "Generate Email".</p>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
