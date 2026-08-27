import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Trash2,
  Check,
  Mail,
  FileText,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { Input, Select } from '@/components/ui/Field';
import ResponsibleAIBadge from '@/components/ui/ResponsibleAIBadge';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

function Toggle({ checked, onChange, label, description }: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="min-w-0">
        <p className="text-sm font-medium text-neutral-900">{label}</p>
        {description && <p className="mt-0.5 text-xs text-neutral-500">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
          checked ? 'bg-primary-600' : 'bg-neutral-300'
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const [notifications, setNotifications] = useState({
    emailReady: true,
    meetingReady: true,
    weeklyDigest: false,
    productUpdates: true,
  });
  const [preferences, setPreferences] = useState({
    defaultTone: 'formal',
    autoSave: true,
    showDisclaimer: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <SettingsIcon size={16} />
          <span>Settings</span>
        </div>
        <h1 className="mt-2 text-2xl font-bold text-neutral-900 sm:text-3xl">Settings & Preferences</h1>
        <p className="mt-1.5 text-sm text-neutral-500 sm:text-base">
          Manage your account, notification, and AI preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile */}
        <Card className="lg:col-span-2 animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50">
                <User size={17} className="text-primary-600" />
              </div>
              <div>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-xl font-bold text-white">
                JM
              </div>
              <div>
                <p className="text-base font-semibold text-neutral-900">James Mitchell</p>
                <p className="text-sm text-neutral-500">Senior Product Manager</p>
                <Badge variant="success" className="mt-1.5">
                  <Check size={11} />
                  Pro Plan
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input id="name" label="Full Name" defaultValue="James Mitchell" />
              <Input id="email" label="Email Address" type="email" defaultValue="james.mitchell@workmate.ai" />
              <Input id="role" label="Job Title" defaultValue="Senior Product Manager" />
              <Input id="company" label="Company" defaultValue="Workmate Inc." />
            </div>
          </CardBody>
        </Card>

        {/* AI Preferences */}
        <Card className="animate-fade-in" style={{ animationDelay: '60ms' }}>
          <CardHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-50">
                <Sparkles size={17} className="text-accent-600" />
              </div>
              <div>
                <CardTitle>AI Preferences</CardTitle>
                <CardDescription>Customize AI behavior.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardBody className="space-y-1">
            <Select
              id="defaultTone"
              label="Default Email Tone"
              value={preferences.defaultTone}
              onChange={(e) => setPreferences({ ...preferences, defaultTone: e.target.value })}
            >
              <option value="formal">Formal</option>
              <option value="friendly">Friendly</option>
              <option value="persuasive">Persuasive</option>
            </Select>
            <div className="divide-y divide-neutral-100">
              <Toggle
                label="Auto-save outputs"
                description="Automatically save AI responses to history."
                checked={preferences.autoSave}
                onChange={(v) => setPreferences({ ...preferences, autoSave: v })}
              />
              <Toggle
                label="Show AI disclaimer"
                description="Display responsible AI notice near outputs."
                checked={preferences.showDisclaimer}
                onChange={(v) => setPreferences({ ...preferences, showDisclaimer: v })}
              />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-success-50">
              <Bell size={17} className="text-success-600" />
            </div>
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Choose what you want to be notified about.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <div className="divide-y divide-neutral-100">
            <Toggle
              label="Email generation complete"
              description="Get notified when your AI email is ready."
              checked={notifications.emailReady}
              onChange={(v) => setNotifications({ ...notifications, emailReady: v })}
            />
            <Toggle
              label="Meeting summary ready"
              description="Get notified when your meeting summary is done."
              checked={notifications.meetingReady}
              onChange={(v) => setNotifications({ ...notifications, meetingReady: v })}
            />
            <Toggle
              label="Weekly activity digest"
              description="Receive a weekly summary of your AI usage."
              checked={notifications.weeklyDigest}
              onChange={(v) => setNotifications({ ...notifications, weeklyDigest: v })}
            />
            <Toggle
              label="Product updates"
              description="Hear about new features and improvements."
              checked={notifications.productUpdates}
              onChange={(v) => setNotifications({ ...notifications, productUpdates: v })}
            />
          </div>
        </CardBody>
      </Card>

      {/* Data & Privacy */}
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100">
              <Shield size={17} className="text-neutral-600" />
            </div>
            <div>
              <CardTitle>Data & Privacy</CardTitle>
              <CardDescription>Manage your data and account security.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="flex items-center justify-between gap-4 rounded-lg border border-neutral-200 bg-neutral-50 p-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">Usage Statistics</p>
              <div className="mt-2 flex flex-wrap gap-4 text-sm text-neutral-600">
                <span className="flex items-center gap-1.5"><Mail size={14} className="text-primary-500" /> 28 emails</span>
                <span className="flex items-center gap-1.5"><FileText size={14} className="text-accent-500" /> 14 meetings</span>
                <span className="flex items-center gap-1.5"><MessageSquare size={14} className="text-success-500" /> 96 chats</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-900">Clear all activity history</p>
              <p className="mt-0.5 text-xs text-neutral-500">This will permanently delete your past AI interactions.</p>
            </div>
            <Button variant="danger" size="sm">
              <Trash2 size={15} />
              Clear History
            </Button>
          </div>
        </CardBody>
      </Card>

      <div className="flex items-center justify-between gap-4">
        <ResponsibleAIBadge compact />
        <Button onClick={handleSave} className="shrink-0">
          {saved ? (
            <>
              <Check size={17} />
              Saved
            </>
          ) : (
            'Save Changes'
          )}
        </Button>
      </div>
    </div>
  );
}
