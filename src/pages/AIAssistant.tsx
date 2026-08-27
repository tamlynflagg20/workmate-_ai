import { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Trash2,
  Sparkles,
  User,
  Bot,
  Mail,
  FileText,
  CheckSquare,
  PenLine,
  HelpCircle,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import TypingIndicator from '@/components/ui/TypingIndicator';
import ResponsibleAIBadge from '@/components/ui/ResponsibleAIBadge';
import CopyButton from '@/components/ui/CopyButton';
import { generateChatResponse } from '@/lib/chatGenerator';
import type { ChatMessage, Page } from '@/types';

interface AIAssistantProps {
  onNavigate: (page: Page) => void;
}

const suggestedPrompts = [
  { label: 'Draft an email', icon: Mail, text: 'Write an email asking my manager for an update on the Q3 project.' },
  { label: 'Summarize notes', icon: FileText, text: 'Summarize these meeting notes: The team discussed the product launch timeline and agreed to prioritize bug fixes.' },
  { label: 'Extract action items', icon: CheckSquare, text: 'What are the action items from this meeting: Sarah will send the plan by Friday, Mike to schedule a design review, team to review QA checklist.' },
  { label: 'Help me write', icon: PenLine, text: 'Rewrite this message in a friendly tone: "I need the report by tomorrow. Send it ASAP."' },
  { label: 'Ask a workplace question', icon: HelpCircle, text: 'Help me prepare for a team meeting with 5 team members about sprint planning.' },
];

let messageIdCounter = 0;
function makeId(): string {
  messageIdCounter += 1;
  return `msg-${Date.now()}-${messageIdCounter}`;
}

export default function AIAssistant({ onNavigate }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: makeId(),
      role: 'assistant',
      content:
        "Hi James! I'm your AI workplace assistant. I can help you draft emails, summarize meetings, extract action items, rewrite messages, and more. What would you like to work on today?",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = {
      id: makeId(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateChatResponse(content);
      const aiMessage: ChatMessage = {
        id: makeId(),
        role: 'assistant',
        content: response,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 1100);
  };

  const handleClear = () => {
    setMessages([
      {
        id: makeId(),
        role: 'assistant',
        content:
          "Hi James! I'm your AI workplace assistant. I can help you draft emails, summarize meetings, extract action items, rewrite messages, and more. What would you like to work on today?",
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <div className="animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
              <MessageSquare size={16} />
              <span>AI Workplace Assistant</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Chat with Workmate AI</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleClear}>
            <Trash2 size={15} />
            Clear
          </Button>
        </div>
      </div>

      <Card className="flex flex-1 flex-col overflow-hidden animate-fade-in">
        {/* Messages */}
        <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              {msg.role === 'assistant' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 shadow-sm">
                  <Bot size={18} className="text-white" />
                </div>
              )}
              <div
                className={`group relative max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed sm:max-w-[70%] ${
                  msg.role === 'user'
                    ? 'rounded-tr-sm bg-primary-600 text-white'
                    : 'rounded-tl-sm border border-neutral-200 bg-white text-neutral-700'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.content}</div>
                {msg.role === 'assistant' && msg.content.length > 50 && (
                  <div className="mt-2 border-t border-neutral-100 pt-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <CopyButton text={msg.content} label="Copy" className="text-xs" />
                  </div>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-200">
                  <User size={18} className="text-neutral-600" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600 shadow-sm">
                <Bot size={18} className="text-white" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-neutral-200 bg-white px-4 py-3.5">
                <TypingIndicator />
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && !loading && (
          <div className="border-t border-neutral-100 p-4 sm:p-6">
            <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
              <Sparkles size={13} />
              Suggested Prompts
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.map((prompt) => {
                const Icon = prompt.icon;
                return (
                  <button
                    key={prompt.label}
                    onClick={() => handleSend(prompt.text)}
                    className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3.5 py-2 text-sm font-medium text-neutral-600 transition-all duration-150 hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                  >
                    <Icon size={14} />
                    {prompt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-neutral-200 p-4 sm:p-6">
          <ResponsibleAIBadge compact className="mb-3" />
          <div className="flex items-end gap-2.5">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything about your work... (Shift+Enter for new line)"
              rows={1}
              className="max-h-32 flex-1 resize-none rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 placeholder:text-neutral-400 transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
              aria-label="Chat message input"
            />
            <Button
              size="lg"
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="shrink-0"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
