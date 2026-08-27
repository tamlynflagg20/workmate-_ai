const responses: { keywords: string[]; response: string }[] = [
  {
    keywords: ['email', 'manager', 'update', 'draft an email'],
    response:
      "Here's a draft email you can send to your manager requesting an update:\n\n**Subject:** Quick Status Check — Project Update Request\n\nHi [Manager's Name],\n\nI hope you're doing well. I wanted to check in on the current status of the project and see if there are any updates or changes I should be aware of. I'm happy to adjust my work based on any new priorities or feedback.\n\nCould we find 15 minutes this week to sync? I'm available Tuesday or Wednesday afternoon.\n\nBest regards,\n[Your Name]",
  },
  {
    keywords: ['professional', 'rewrite', 'more professional', 'make this'],
    response:
      "Here's a more professional version of your message:\n\n\"I wanted to follow up regarding the matter we discussed previously. I would appreciate the opportunity to address this further at your earliest convenience. Please let me know if you might have time to connect this week — I'm happy to work around your schedule.\"",
  },
  {
    keywords: ['summarize', 'meeting', 'notes'],
    response:
      "Here's a summary of the meeting notes:\n\n**Overview:** The team discussed project progress and aligned on priorities for the upcoming sprint.\n\n**Key Decisions:**\n- Approved the revised timeline for the product launch\n- Agreed to prioritize bug fixes over new features this sprint\n\n**Action Items:**\n- Sarah will send the updated project plan by Friday\n- Mike to schedule a design review with the product team\n- Team to review the QA checklist before next standup\n\nWould you like me to extract these as a formatted summary you can share?",
  },
  {
    keywords: ['action items', 'extract', 'tasks'],
    response:
      "Here are the action items extracted from the meeting:\n\n1. **Sarah Chen** — Send updated project plan to stakeholders (Due: Friday)\n2. **Mike Rodriguez** — Schedule design review with product team (Due: This week)\n3. **Team** — Review QA checklist before next standup (Due: Next standup)\n4. **James Mitchell** — Draft client communication for Q3 launch (Due: Monday)\n\nWould you like me to format these differently or assign priorities?",
  },
  {
    keywords: ['prepare', 'team meeting', 'agenda', 'talking points'],
    response:
      "Here's a suggested agenda for your team meeting:\n\n**1. Opening (5 min)**\n- Quick round-table status updates from each team member\n\n**2. Project Review (15 min)**\n- Progress against sprint goals\n- Blockers and dependencies\n- Budget and timeline check\n\n**3. Discussion Items (15 min)**\n- Priority changes or new requests\n- Resource allocation for upcoming work\n\n**4. Action Items & Next Steps (5 min)**\n- Assign owners and deadlines\n- Confirm next meeting date\n\nWould you like me to adjust the time allocations or add specific discussion topics?",
  },
  {
    keywords: ['friendly', 'tone', 'rewrite this'],
    response:
      "Here's a friendlier version:\n\n\"Hey! Hope you're having a good week. Just wanted to check in on that thing we talked about — no rush at all, but wanted to see where things stand. Let me know if there's anything I can help with. Happy to jump on a quick call if that's easier!\"",
  },
  {
    keywords: ['client', 'response', 'professional response', 'customer'],
    response:
      "Here's a professional response to your client:\n\n**Subject:** Re: Your Inquiry — Thank You for Reaching Out\n\nDear [Client Name],\n\nThank you for reaching out. I appreciate you taking the time to connect with us, and I want to assure you that your inquiry is important to us.\n\nI've reviewed your message and would be happy to help. To ensure I provide the most accurate and helpful response, I'll need to gather a few additional details from our team. You can expect a comprehensive follow-up from me within 24 hours.\n\nIn the meantime, please don't hesitate to reach out if you have any immediate questions or concerns.\n\nBest regards,\n[Your Name]\n[Your Title]",
  },
];

const defaultResponse =
  "I'm here to help with your workplace tasks! I can assist with drafting emails, summarizing meeting notes, extracting action items, rewriting messages in different tones, preparing for meetings, and answering workplace questions. \n\nCould you tell me a bit more about what you need? For example, you could ask me to:\n- Draft an email requesting an update from your manager\n- Summarize meeting notes you paste here\n- Rewrite a message to be more professional or friendly\n- Help you prepare an agenda for an upcoming team meeting\n\nWhat would you like to work on?";

export function generateChatResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  for (const entry of responses) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.response;
    }
  }
  return defaultResponse;
}
