export type Page = 'dashboard' | 'email' | 'meeting' | 'assistant' | 'history' | 'settings';

export type Tone = 'formal' | 'friendly' | 'persuasive';
export type EmailLength = 'short' | 'medium' | 'long';

export interface EmailGeneration {
  id: string;
  subject: string;
  greeting: string;
  body: string;
  closing: string;
  createdAt: string;
  input: EmailInput;
}

export interface EmailInput {
  recipient: string;
  purpose: string;
  keyInfo: string;
  tone: Tone;
  length: EmailLength;
}

export interface ActionItem {
  task: string;
  assignee?: string;
  deadline?: string;
}

export interface MeetingSummary {
  id: string;
  summary: string;
  actionItems: ActionItem[];
  decisions: string[];
  deadlines: string[];
  createdAt: string;
  inputPreview: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface ActivityEntry {
  id: string;
  type: 'email' | 'meeting' | 'chat';
  title: string;
  description: string;
  timestamp: string;
}
