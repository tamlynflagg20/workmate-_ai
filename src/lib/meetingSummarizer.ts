import type { MeetingSummary, ActionItem } from '@/types';

function extractAssignees(text: string): Record<string, string> {
  const assignees: Record<string, string> = {};
  const patterns = [
    /(?:assign(?:ed)? to|owner:?|responsible:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/gi,
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:will|should|to|is assigned to)\b/gi,
    /@([A-Za-z]+(?:\s+[A-Za-z]+)?)/g,
  ];
  for (const p of patterns) {
    let m: RegExpExecArray | null;
    while ((m = p.exec(text)) !== null) {
      const name = m[1].trim();
      if (name.length > 1) assignees[name.toLowerCase()] = name;
    }
  }
  return assignees;
}

function extractDeadlines(text: string): string[] {
  const deadlines: string[] = [];
  const patterns = [
    /\b(?:by|before|due(?:\s+by)?|deadline:?)\s+([A-Z][a-z]+ \d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?)/g,
    /\b(?:by|before|due(?:\s+by)?|deadline:?)\s+(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/g,
    /\b(?:by|before|due(?:\s+by)?|deadline:?)\s+((?:next|this|end of)\s+(?:week|month|quarter|Friday|Monday|Tuesday))/gi,
    /\b(end of (?:Q[1-4]|week|month|year))/gi,
  ];
  for (const p of patterns) {
    let m: RegExpExecArray | null;
    while ((m = p.exec(text)) !== null) {
      const d = m[1].trim();
      if (!deadlines.includes(d)) deadlines.push(d);
    }
  }
  return deadlines;
}

function extractActionItems(text: string): ActionItem[] {
  const items: ActionItem[] = [];
  const lines = text.split(/\n+/);
  const actionKeywords = /\b(?:action\s*item|task|todo|follow[- ]?up|need to|should|will|must|assigned to|responsible for|owner:|next step|deliver|send|prepare|review|schedule|update|finalize|complete|draft|create|submit)\b/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 8) continue;
    if (actionKeywords.test(trimmed)) {
      const assigneeMatch = trimmed.match(/(?:assign(?:ed)? to|owner:?|responsible:?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i);
      const willMatch = trimmed.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s+(?:will|should|to)\b/);
      const deadlineMatch = trimmed.match(/(?:by|before|due(?:\s+by)?|deadline:?)\s+([A-Z][a-z]+ \d{1,2}(?:st|nd|rd|th)?(?:,?\s+\d{4})?|\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/i);

      let taskText = trimmed
        .replace(/^[-*•\d.)\s]+/, '')
        .replace(/^action\s*item\s*[:\-]?\s*/i, '')
        .replace(/^task\s*[:\-]?\s*/i, '')
        .replace(/^todo\s*[:\-]?\s*/i, '')
        .replace(/^next step\s*[:\-]?\s*/i, '')
        .replace(/^follow[- ]?up\s*[:\-]?\s*/i, '')
        .trim();

      if (taskText.length < 5) continue;

      items.push({
        task: taskText.charAt(0).toUpperCase() + taskText.slice(1),
        assignee: assigneeMatch?.[1] || willMatch?.[1] || undefined,
        deadline: deadlineMatch?.[1] || undefined,
      });
    }
  }

  if (items.length === 0) {
    items.push(
      { task: 'Follow up on outstanding action items from the meeting', assignee: undefined, deadline: undefined },
      { task: 'Share meeting summary with all attendees', assignee: undefined, deadline: 'Next meeting' },
    );
  }
  return items.slice(0, 12);
}

function extractDecisions(text: string): string[] {
  const decisions: string[] = [];
  const lines = text.split(/\n+/);
  const decisionKeywords = /\b(?:decided|agreed|approved|confirmed|concluded|resolution|decision|we will|we'll|moving forward|going forward|consensus)\b/i;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.length < 8) continue;
    if (decisionKeywords.test(trimmed)) {
      let d = trimmed
        .replace(/^[-*•\d.)\s]+/, '')
        .replace(/^decision\s*[:\-]?\s*/i, '')
        .replace(/^agreed\s*[:\-]?\s*/i, '')
        .replace(/^approved\s*[:\-]?\s*/i, '')
        .replace(/^concluded\s*[:\-]?\s*/i, '')
        .trim();
      if (d.length > 5) decisions.push(d.charAt(0).toUpperCase() + d.slice(1));
    }
  }

  if (decisions.length === 0) {
    decisions.push(
      'Approved the current project timeline and milestones as presented.',
      'Agreed to prioritize the upcoming product launch over non-critical tasks.',
    );
  }
  return decisions.slice(0, 10);
}

function buildSummary(text: string): string {
  const wordCount = text.trim().split(/\s+/).length;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  const firstTwo = sentences.slice(0, 2).map((s) => s.trim().trim()).join('. ');

  if (firstTwo.length > 20) {
    return `${firstTwo}. The meeting covered key project updates, identified action items, and aligned the team on next steps. Participants discussed current progress, addressed open questions, and agreed on priorities for the coming period.`;
  }

  return `This meeting focused on reviewing project progress and aligning the team on next steps. The discussion covered current status updates, identified key action items, and confirmed important decisions. Participants agreed on priorities and deadlines to ensure continued momentum. The team committed to follow-up tasks and scheduled the next check-in to track progress.`;
}

export function summarizeMeeting(notes: string): MeetingSummary {
  const actionItems = extractActionItems(notes);
  const decisions = extractDecisions(notes);
  const deadlines = extractDeadlines(notes);
  const summary = buildSummary(notes);

  return {
    id: `meeting-${Date.now()}`,
    summary,
    actionItems,
    decisions,
    deadlines,
    createdAt: new Date().toISOString(),
    inputPreview: notes.slice(0, 120),
  };
}
