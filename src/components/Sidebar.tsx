import {
  LayoutDashboard,
  Mail,
  FileText,
  MessageSquare,
  History,
  Settings,
  Sparkles,
  X,
} from 'lucide-react';
import type { Page } from '@/types';

interface SidebarProps {
  current: Page;
  onNavigate: (page: Page) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems: { id: Page; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'email', label: 'Smart Email Generator', icon: Mail },
  { id: 'meeting', label: 'Meeting Notes', icon: FileText },
  { id: 'assistant', label: 'AI Workplace Assistant', icon: MessageSquare },
  { id: 'history', label: 'History', icon: History },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ current, onNavigate, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-neutral-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 transform border-r border-neutral-200 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-neutral-100 px-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 shadow-sm">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-neutral-900">Workmate AI</h1>
                <p className="text-[11px] font-medium text-neutral-400">Your intelligent work assistant</p>
              </div>
            </div>
            <button
              onClick={onCloseMobile}
              className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 lg:hidden"
              aria-label="Close navigation menu"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Sidebar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = current === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    onCloseMobile();
                  }}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                    active
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon
                    size={19}
                    className={`shrink-0 transition-colors ${
                      active ? 'text-primary-600' : 'text-neutral-400 group-hover:text-neutral-600'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                  {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary-500" />}
                </button>
              );
            })}
          </nav>

          <div className="border-t border-neutral-100 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-neutral-50 px-3 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
                JM
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-900">James Mitchell</p>
                <p className="truncate text-xs text-neutral-400">Senior Product Manager</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
