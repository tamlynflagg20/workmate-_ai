import {
  Mail,
  FileText,
  MessageSquare,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  MailOpen,
  Calendar,
  Bot,
} from 'lucide-react';
import { Card, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import ResponsibleAIBadge from '@/components/ui/ResponsibleAIBadge';
import type { Page } from '@/types';
import { recentActivity, stats } from '@/data';

interface DashboardProps {
  onNavigate: (page: Page) => void;
}

const activityIcons = {
  email: { icon: MailOpen, color: 'bg-primary-50 text-primary-600' },
  meeting: { icon: Calendar, color: 'bg-accent-50 text-accent-600' },
  chat: { icon: Bot, color: 'bg-success-50 text-success-600' },
};

export default function Dashboard({ onNavigate }: DashboardProps) {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const statCards = [
    { label: 'Emails Generated', value: stats.emailsGenerated, icon: Mail, color: 'bg-primary-50 text-primary-600', trend: '+12% this week' },
    { label: 'Meetings Summarized', value: stats.meetingsSummarized, icon: FileText, color: 'bg-accent-50 text-accent-600', trend: '+5% this week' },
    { label: 'AI Conversations', value: stats.aiConversations, icon: MessageSquare, color: 'bg-success-50 text-success-600', trend: '+23% this week' },
    { label: 'Recent Activity', value: recentActivity.length, icon: TrendingUp, color: 'bg-warning-50 text-warning-600', trend: 'Last 3 days' },
  ];

  const quickActions = [
    {
      title: 'Generate Email',
      description: 'Draft a professional email in seconds',
      icon: Mail,
      page: 'email' as Page,
      color: 'from-primary-500 to-primary-700',
    },
    {
      title: 'Summarize Meeting',
      description: 'Extract action items and decisions',
      icon: FileText,
      page: 'meeting' as Page,
      color: 'from-accent-500 to-accent-700',
    },
    {
      title: 'Ask AI Assistant',
      description: 'Chat with your AI workplace assistant',
      icon: MessageSquare,
      page: 'assistant' as Page,
      color: 'from-success-500 to-success-700',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <Sparkles size={16} />
          <span>{greeting}, James</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">
          How can I help you today?
        </h1>
        <p className="mt-1.5 text-sm text-neutral-500 sm:text-base">
          Your intelligent assistant for everyday work — draft emails, summarize meetings, and get instant workplace help.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} hover className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
              <CardBody className="p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}>
                    <Icon size={20} />
                  </div>
                  <Badge variant="success" className="text-[10px]">
                    <TrendingUp size={10} />
                    {stat.trend}
                  </Badge>
                </div>
                <p className="mt-3 text-2xl font-bold text-neutral-900 sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-xs font-medium text-neutral-500 sm:text-sm">{stat.label}</p>
              </CardBody>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-neutral-700">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (
              <button
                key={action.title}
                onClick={() => onNavigate(action.page)}
                className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white p-5 text-left shadow-card transition-all duration-200 hover:shadow-card-hover hover:border-neutral-300 animate-fade-in"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${action.color} text-white shadow-sm`}>
                  <Icon size={22} />
                </div>
                <h4 className="mt-3.5 text-base font-semibold text-neutral-900">{action.title}</h4>
                <p className="mt-1 text-sm text-neutral-500">{action.description}</p>
                <div className="mt-3 flex items-center gap-1 text-sm font-medium text-primary-600 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Get started
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-neutral-700">Recent Activity</h3>
          <Button variant="ghost" size="sm" onClick={() => onNavigate('history')}>
            View all
            <ArrowRight size={14} />
          </Button>
        </div>
        <Card>
          <div className="divide-y divide-neutral-100">
            {recentActivity.slice(0, 5).map((activity, i) => {
              const config = activityIcons[activity.type];
              const Icon = config.icon;
              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-4 transition-colors duration-150 hover:bg-neutral-50 sm:p-5 animate-fade-in"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-neutral-900">{activity.title}</p>
                    <p className="mt-0.5 text-sm text-neutral-500">{activity.description}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1 text-xs text-neutral-400">
                    <Clock size={12} />
                    {activity.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <ResponsibleAIBadge />
    </div>
  );
}
