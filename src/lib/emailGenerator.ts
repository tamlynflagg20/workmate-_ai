import type { EmailInput, EmailGeneration } from '@/types';

const greetings: Record<string, string> = {
  formal: 'Dear',
  friendly: 'Hi',
  persuasive: 'Hello',
};

const closings: Record<string, string> = {
  formal: 'Respectfully,\nJames Mitchell\nSenior Product Manager',
  friendly: 'Best regards,\nJames Mitchell\nSenior Product Manager',
  persuasive: 'Looking forward to your response,\nJames Mitchell\nSenior Product Manager',
};

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function buildSubject(input: EmailInput): string {
  const purpose = input.purpose.trim() || 'Update';
  const recipient = input.recipient.trim();
  if (recipient) {
    return `${capitalize(purpose)} — Regarding ${recipient}`;
  }
  return `${capitalize(purpose)} — Action Required`;
}

function buildBody(input: EmailInput): string {
  const { recipient, purpose, keyInfo, tone, length } = input;
  const name = recipient.trim() || 'team';
  const purposeText = purpose.trim() || 'provide an update';
  const keyInfoText = keyInfo.trim() || 'Please let me know if you need any additional details.';

  const intro: Record<string, string> = {
    formal: `I hope this message finds you well. I am writing to ${purposeText} regarding ${name}.`,
    friendly: `Hope you're doing well! I wanted to reach out to ${purposeText} about ${name}.`,
    persuasive: `I hope you're having a great week. I'm reaching out to ${purposeText} regarding ${name}, and I believe this is worth your attention.`,
  };

  const bodyCore = keyInfoText;

  const shortClose = `\n\nPlease let me know if you have any questions or would like to discuss further.`;
  const mediumClose = `\n\nI'd be happy to provide additional context or schedule a quick call to discuss this in more detail. Please let me know what works best for you.`;
  const longClose = `\n\nI would be glad to walk through any of the points above in more detail. If it would be helpful, I can put together a brief summary document or schedule a 30-minute call at your convenience. Please don't hesitate to reach out if there's anything you'd like to clarify or any concerns you'd like to address.\n\nThank you for your time and consideration.`;

  const close =
    length === 'short' ? shortClose : length === 'long' ? longClose : mediumClose;

  return `${intro[tone]}\n\n${bodyCore}${close}`;
}

export function generateEmail(input: EmailInput): EmailGeneration {
  const recipient = input.recipient.trim() || 'Colleague';
  const subject = buildSubject(input);
  const greeting = `${greetings[input.tone]} ${recipient},`;
  const body = buildBody(input);
  const closing = closings[input.tone];

  return {
    id: `email-${Date.now()}`,
    subject,
    greeting,
    body,
    closing,
    createdAt: new Date().toISOString(),
    input,
  };
}
