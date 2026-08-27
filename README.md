# Workmate AI

**Your intelligent assistant for everyday work.**

Workmate AI is a modern, responsive web application that helps professionals improve productivity, communication, and meeting management. It combines an AI-powered email generator, a meeting notes summarizer, and a conversational AI assistant into one unified, polished SaaS experience.

## Features

### Dashboard
- Time-aware welcome message
- Overview cards for emails generated, meetings summarized, AI conversations, and recent activity
- Quick-action buttons to jump straight into email generation, meeting summarization, or AI chat
- Recent activity feed showing the latest AI interactions

### Smart Email Generator
- Input fields for recipient/context, purpose, key information, tone, and length
- Tone options: Formal, Friendly, Persuasive
- Length options: Short, Medium, Long
- AI-generated output with subject line, greeting, body, and closing
- Copy, Regenerate, Edit, and Clear actions

### Meeting Notes Summarizer
- Large text area for pasting meeting notes or transcripts
- AI-structured output organized into:
  - **Summary** — concise overview of the meeting
  - **Action Items** — extracted tasks with assignees and deadlines where identifiable
  - **Decisions** — key decisions made during the meeting
  - **Deadlines** — extracted dates and time-sensitive commitments
- Copy summary and regenerate options

### AI Workplace Assistant
- Conversational chat interface with message history
- Visually distinct user and AI messages
- Typing indicator and loading states
- Suggested prompt buttons (draft an email, summarize notes, extract action items, etc.)
- Copy AI responses and clear conversation

### History
- Searchable, filterable list of past AI activity
- Filter by type: emails, meetings, chats

### Settings
- Profile management
- AI preference controls (default tone, auto-save, disclaimer visibility)
- Notification toggles
- Data and privacy management

## Design

- Clean, minimalist SaaS aesthetic with a blue primary accent
- Inter typeface for professional typography
- Rounded cards with subtle shadows and thin borders
- Smooth hover states, focus states, and micro-interactions
- Fully responsive: persistent sidebar on desktop, bottom navigation bar on mobile
- Accessible: semantic HTML, keyboard navigation, visible focus states, ARIA labels
- Responsible AI disclaimer displayed near AI-generated output

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Run type checking
npm run typecheck
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI primitives (Button, Card, Badge, Field, etc.)
│   ├── Sidebar.tsx      # Left navigation sidebar
│   └── TopBar.tsx       # Top header bar
├── lib/
│   ├── emailGenerator.ts    # Email generation logic
│   ├── meetingSummarizer.ts # Meeting summary extraction logic
│   └── chatGenerator.ts     # Chat response logic
├── pages/
│   ├── Dashboard.tsx
│   ├── EmailGenerator.tsx
│   ├── MeetingNotes.tsx
│   ├── AIAssistant.tsx
│   ├── History.tsx
│   └── Settings.tsx
├── types.ts             # Shared TypeScript types
├── data.ts              # Demo/sample data
└── App.tsx              # Main app with routing and layout
```

## Responsible AI

AI-generated content may contain mistakes or inaccuracies. Always review and verify AI-generated emails, summaries, decisions, deadlines, and other information before using or sharing them.

## License

This project is for demonstration purposes.
