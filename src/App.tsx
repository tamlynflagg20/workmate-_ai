import { useState, useEffect } from 'react';
import { LayoutDashboard, Mail, FileText, MessageSquare, History, Settings as SettingsIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Dashboard from '@/pages/Dashboard';
import EmailGenerator from '@/pages/EmailGenerator';
import MeetingNotes from '@/pages/MeetingNotes';
import AIAssistant from '@/pages/AIAssistant';
import HistoryPage from '@/pages/History';
import SettingsPage from '@/pages/Settings';
import type { Page } from '@/types';

const pageTitles: Record<Page, string> = {
  dashboard: 'Dashboard',
  email: 'Smart Email Generator',
  meeting: 'Meeting Notes Summarizer',
  assistant: 'AI Workplace Assistant',
  history: 'History',
  settings: 'Settings',
};

const mobileNavItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'meeting', label: 'Notes', icon: FileText },
  { id: 'assistant', label: 'Chat', icon: MessageSquare },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

export default function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <Dashboard onNavigate={setPage} />;
      case 'email':
        return <EmailGenerator />;
      case 'meeting':
        return <MeetingNotes />;
      case 'assistant':
        return <AIAssistant onNavigate={setPage} />;
      case 'history':
        return <HistoryPage onNavigate={setPage} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onNavigate={setPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar
        current={page}
        onNavigate={setPage}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="lg:pl-72">
        <TopBar title={pageTitles[page]} onOpenMobile={() => setMobileSidebarOpen(true)} />

        <main className="mx-auto max-w-6xl px-4 py-6 pb-24 sm:px-6 sm:py-8 lg:px-8 lg:pb-8">
          {renderPage()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around border-t border-neutral-200 bg-white/90 px-1 py-1.5 backdrop-blur-md lg:hidden"
        aria-label="Mobile navigation"
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 transition-colors ${
                active ? 'text-primary-600' : 'text-neutral-400'
              }`}
              aria-current={active ? 'page' : undefined}
              aria-label={item.label}
            >
              <Icon size={20} className={active ? 'text-primary-600' : 'text-neutral-400'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
