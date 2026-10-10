import React, { useState } from 'react';
import { 
  Zap, 
  Power, 
  AlertTriangle, 
  LayoutDashboard, 
  ShoppingBag, 
  Layers, 
  Sparkles, 
  CalendarClock, 
  Share2, 
  Mail, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function MainLayout({ children }) {
  const { 
    activePage, 
    setActivePage, 
    killSwitchActive, 
    toggleEmergencyKill, 
    pendingApprovalsCount, 
    toast 
  } = useAffiliate();

  const [confirmKill, setConfirmKill] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: ShoppingBag },
    { id: 'campaigns', label: 'Campaigns', icon: Layers },
    { id: 'studio', label: 'Content Studio', icon: Sparkles, badge: 'AI' },
    { 
      id: 'calendar', 
      label: 'Content Calendar', 
      icon: CalendarClock,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Review` : null,
      badgeColor: 'bg-amber-500 text-black font-extrabold'
    },
    { id: 'accounts', label: 'Social Accounts', icon: Share2 },
    { id: 'email', label: 'Email Marketing', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-[#0a0b10] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans']">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2 ${
            toast.type === 'error' ? 'bg-red-950/90 border-red-500 text-red-200' :
            toast.type === 'warning' ? 'bg-amber-950/90 border-amber-500 text-amber-200' :
            'bg-emerald-950/90 border-emerald-500 text-emerald-200'
          }`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0e17]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/25 ring-1 ring-white/20">
              <Zap className="w-5 h-5 text-white animate-pulse" />
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-xl blur-sm opacity-30 -z-10"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white font-['Outfit']">
                  Affili<span className="glow-gradient-text">Matrix</span> AI
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Affiliate OS SaaS
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Human-Supervised Multi-Platform Automation Platform
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Sandbox Quota Protected</span>
            </div>

            {/* Emergency Kill Switch */}
            <button
              onClick={() => {
                if (!killSwitchActive && !confirmKill) {
                  setConfirmKill(true);
                  setTimeout(() => setConfirmKill(false), 4000);
                } else {
                  toggleEmergencyKill(!killSwitchActive);
                  setConfirmKill(false);
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer ${
                killSwitchActive
                  ? 'bg-red-500 text-white ring-2 ring-red-400 animate-pulse shadow-red-500/50'
                  : confirmKill
                  ? 'bg-amber-500 text-black ring-2 ring-amber-300 font-extrabold animate-bounce'
                  : 'bg-red-500/15 border border-red-500/30 text-red-300 hover:bg-red-500/25'
              }`}
            >
              <Power className={`w-4 h-4 ${killSwitchActive ? 'animate-spin' : ''}`} />
              <span>
                {killSwitchActive
                  ? 'QUEUES PAUSED (KILL SWITCH)'
                  : confirmKill
                  ? 'CONFIRM PAUSE ALL?'
                  : 'Emergency Pause'}
              </span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
                alt="Supervisor" 
                className="w-8 h-8 rounded-full ring-1 ring-indigo-500/40 object-cover"
              />
              <div className="hidden lg:block text-left">
                <div className="text-xs font-semibold text-slate-200">Alex Vance</div>
                <div className="text-[10px] text-indigo-400">Pro Marketer Plan</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="border-b border-white/5 bg-[#0e101a]/70 backdrop-blur-md px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-white/10 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AffiliMatrix AI • SaaS Multi-Platform Marketing Operating System</span>
          <span className="font-mono text-[11px] text-slate-400">FTC 16 CFR § 255 Enforced • Multi-Tenant Architecture</span>
        </div>
      </footer>
    </div>
  );
}
