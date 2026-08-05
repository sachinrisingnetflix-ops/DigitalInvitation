import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Mail,
  Palette,
  Settings,
  Users,
  Menu,
  X,
  Crown,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Mail, label: 'Invitations', href: '/admin/invitations' },
  { icon: Users, label: 'Guests', href: '/admin/guests' },
  { icon: Palette, label: 'Templates', href: '/admin/templates' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-black text-ivory font-body flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 z-50 h-screen w-72 border-r border-gold/10 bg-black-50 flex flex-col transition-transform duration-500 ease-luxury lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center gap-3 px-8 border-b border-gold/10">
          <Crown className="h-5 w-5 text-gold" />
          <span className="font-display text-lg font-medium">
            Admin
          </span>
          <button
            className="ml-auto lg:hidden text-ivory/60 hover:text-ivory"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  'flex items-center gap-4 rounded-elegant px-4 py-3 font-body text-body-sm transition-all duration-300',
                  active
                    ? 'bg-gold/10 text-gold border-l-2 border-gold'
                    : 'text-ivory/50 hover:text-ivory hover:bg-gold/5 border-l-2 border-transparent'
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Card */}
        <div className="p-6 border-t border-gold/10">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center">
              <span className="font-display text-sm text-gold">AM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-body-sm font-medium text-ivory truncate">
                Alexandra Morgan
              </p>
              <p className="font-body text-body-sm text-ivory/40 truncate">
                alexandra@velvetgold.com
              </p>
            </div>
            <button className="text-ivory/30 hover:text-gold transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-20 border-b border-gold/10 bg-black-50/50 backdrop-blur-xl flex items-center px-6 lg:px-10 gap-4 sticky top-0 z-30">
          <button
            className="lg:hidden text-ivory/60 hover:text-ivory"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="gold-line-vertical h-6 hidden lg:block" />
          <h1 className="font-display text-lg font-medium">Dashboard</h1>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
