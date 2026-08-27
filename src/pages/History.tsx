import {
  MailOpen,
  Calendar,
  Bot,
  Clock,
  Search,
  Filter,
  Trash2,
  Mail,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { useState } from 'react';
import { Card, CardBody } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import { recentActivity } from '@/data';
import type { Page } from '@/types';

interface HistoryProps {
  onNavigate: (page: Page) => void;
}

const activityIcons = {
  email: { icon: MailOpen, color: 'bg-primary-50 text-primary-600', label: 'Email' },
  meeting: { icon: Calendar, color: 'bg-accent-50 text-accent-600', label: 'Meeting' },
  chat: { icon: Bot, color: 'bg-success-50 text-success-600', label: 'Chat' },
};

type FilterType = 'all' | 'email' | 'meeting' | 'chat';

export default function History({ onNavigate }: HistoryProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');

  const filtered = recentActivity.filter((activity) => {
    const matchesFilter = filter === 'all' || activity.type === filter;
    const matchesSearch =
      !search ||
      activity.title.toLowerCase().includes(search.toLowerCase()) ||
      activity.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'email', label: 'Emails' },
    { value: 'meeting', label: 'Meetings' },
    { value: 'chat', label: 'Chats' },
  ];

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <Clock size={16} />
          <span>History</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Your AI Activity History</h1>
        <p className="mt-1.5 text-sm text-neutral-500 sm:text-base">
          Browse your past emails, meeting summaries, and AI conversations.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between animate-fade-in">
        <div className="relative flex-1 sm:max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search activity..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 bg-white py-2.5 pl-9 pr-3 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter size={15} className="shrink-0 text-neutral-400" />
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
                filter === opt.value
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((activity, i) => {
            const config = activityIcons[activity.type];
            const Icon = config.icon;
            return (
              <Card
                key={activity.id}
                hover
                className="animate-fade-in cursor-pointer"
                style={{ animationDelay: `${i * 40}ms` }}
                onClick={() => onNavigate(activity.type === 'email' ? 'email' : activity.type === 'meeting' ? 'meeting' : 'assistant')}
              >
                <CardBody className="flex items-start gap-4 p-4 sm:p-5">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-neutral-900">{activity.title}</p>
                      <Badge variant="neutral" className="shrink-0">{config.label}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-neutral-500">{activity.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-neutral-400">
                      <Clock size={12} />
                      {activity.timestamp}
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })
        ) : (
          <Card>
            <CardBody className="py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                <Search size={28} className="text-neutral-300" />
              </div>
              <p className="mt-4 text-sm font-medium text-neutral-500">No activity found.</p>
              <p className="mt-1 text-xs text-neutral-400">Try adjusting your search or filters.</p>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: 'Generate a new email', icon: Mail, page: 'email' as Page, color: 'text-primary-600 bg-primary-50' },
          { label: 'Summarize a meeting', icon: FileText, page: 'meeting' as Page, color: 'text-accent-600 bg-accent-50' },
          { label: 'Chat with AI assistant', icon: MessageSquare, page: 'assistant' as Page, color: 'text-success-600 bg-success-50' },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.page)}
              className="group flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-left shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-neutral-300"
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}>
                <Icon size={20} />
              </div>
              <span className="text-sm font-medium text-neutral-700 group-hover:text-neutral-900">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
