import type { ActivityEntry } from '@/types';

export const recentActivity: ActivityEntry[] = [
  {
    id: 'act-1',
    type: 'email',
    title: 'Email to Sarah Chen — Project Update',
    description: 'Generated a formal project status update email to the marketing director.',
    timestamp: '12 minutes ago',
  },
  {
    id: 'act-2',
    type: 'meeting',
    title: 'Q3 Planning Meeting — Summary',
    description: 'Summarized 45-minute meeting notes with 6 action items extracted.',
    timestamp: '1 hour ago',
  },
  {
    id: 'act-3',
    type: 'chat',
    title: 'Drafted client onboarding response',
    description: 'Asked AI to create a professional response to a new client inquiry.',
    timestamp: '3 hours ago',
  },
  {
    id: 'act-4',
    type: 'email',
    title: 'Email to Dev Team — Sprint Retro',
    description: 'Generated a friendly recap email summarizing sprint retrospective points.',
    timestamp: 'Yesterday',
  },
  {
    id: 'act-5',
    type: 'meeting',
    title: 'Stakeholder Review — Summary',
    description: 'Extracted 4 key decisions and 3 deadlines from stakeholder meeting notes.',
    timestamp: 'Yesterday',
  },
  {
    id: 'act-6',
    type: 'chat',
    title: 'Prepared for 1:1 with manager',
    description: 'Used AI assistant to outline talking points for a weekly check-in.',
    timestamp: '2 days ago',
  },
];

export const stats = {
  emailsGenerated: 28,
  meetingsSummarized: 14,
  aiConversations: 96,
};
