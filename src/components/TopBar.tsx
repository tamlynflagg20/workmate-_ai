import { Menu } from 'lucide-react';
import { Sparkles } from 'lucide-react';

interface TopBarProps {
  title: string;
  onOpenMobile: () => void;
}

export default function TopBar({ title, onOpenMobile }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="text-sm font-bold text-neutral-900">Workmate AI</span>
        </div>
        <h2 className="hidden text-lg font-semibold text-neutral-900 lg:block">{title}</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 sm:flex">
          <span className="flex h-2 w-2 rounded-full bg-success-500" />
          <span className="text-xs font-medium text-neutral-500">AI Online</span>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600 text-sm font-semibold text-white">
          JM
        </div>
      </div>
    </header>
  );
}
