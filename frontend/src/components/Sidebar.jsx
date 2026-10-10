import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Sparkles, 
  CheckCheck, 
  CalendarClock, 
  Share2, 
  ShieldCheck 
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, pendingCount = 0 }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Mission Control',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'products',
      label: 'Product Catalog',
      icon: ShoppingBag,
      badge: null
    },
    {
      id: 'studio',
      label: 'AI Content Studio',
      icon: Sparkles,
      badge: 'AI'
    },
    {
      id: 'approvals',
      label: 'Approval Queue',
      icon: CheckCheck,
      badge: pendingCount > 0 ? pendingCount : null,
      badgeColor: 'bg-amber-500 text-black font-bold'
    },
    {
      id: 'queue',
      label: 'Scheduler & Queue',
      icon: CalendarClock,
      badge: null
    },
    {
      id: 'platforms',
      label: 'Platform Adapters',
      icon: Share2,
      badge: '6 Active'
    },
    {
      id: 'compliance',
      label: 'FTC Inspector',
      icon: ShieldCheck,
      badge: null
    }
  ];

  return (
    <nav className="border-b border-white/5 bg-[#0e101a]/70 backdrop-blur-md px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full ${
                    item.badgeColor || 'bg-white/10 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
