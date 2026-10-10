import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  MousePointerClick, 
  DollarSign, 
  Sparkles, 
  Share2, 
  Calendar 
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function Analytics() {
  const { analytics } = useAffiliate();

  const overview = analytics?.overview || {
    totalRevenue: '$5,610.50',
    totalClicks: 4910,
    totalConversions: 260,
    epc: '$1.14',
    conversionRate: '5.3%'
  };

  const platforms = analytics?.platformPerformance || [
    { platform: 'YouTube Shorts', clicks: 1820, conv: 104, rev: 2280, color: '#ef4444' },
    { platform: 'TikTok', clicks: 1450, conv: 78, rev: 1650, color: '#00f2fe' },
    { platform: 'X (Twitter)', clicks: 840, conv: 42, rev: 890, color: '#38bdf8' },
    { platform: 'Instagram Reels', clicks: 520, conv: 24, rev: 510, color: '#ec4899' },
    { platform: 'LinkedIn', clicks: 180, conv: 8, rev: 180, color: '#0284c7' },
    { platform: 'Pinterest', clicks: 100, conv: 4, rev: 100.50, color: '#e11d48' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
          Attribution & <span className="glow-gradient-text">Revenue Analytics</span>
        </h2>
        <p className="text-sm text-slate-400">
          Campaign-level click tracking, channel attribution, conversion funnels, and earnings per click.
        </p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold mb-1">Gross Affiliate Commission</div>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit']">{overview.totalRevenue}</div>
          <div className="text-[11px] text-emerald-400/80 font-semibold mt-1">+24% vs last period</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold mb-1">Total Tracked Clicks</div>
          <div className="text-2xl font-black text-cyan-400 font-['Outfit']">{overview.totalClicks.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct link attribution</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold mb-1">Attributed Sales (Conversions)</div>
          <div className="text-2xl font-black text-white font-['Outfit']">{overview.totalConversions}</div>
          <div className="text-[11px] text-indigo-400 font-semibold mt-1">{overview.conversionRate} conversion rate</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="text-xs text-slate-400 font-semibold mb-1">Earnings Per Click (EPC)</div>
          <div className="text-2xl font-black text-purple-400 font-['Outfit']">{overview.epc}</div>
          <div className="text-[11px] text-purple-400/80 font-semibold mt-1">High purchase velocity</div>
        </div>
      </div>

      {/* Performance by Platform Breakdown */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Platform Channel Attribution</h3>
            <p className="text-xs text-slate-400">Comparing conversions, traffic volume, and revenue by adapter</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">30-day window</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map(p => (
            <div key={p.platform} className="p-4 rounded-xl bg-black/25 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{p.platform}</span>
                <span className="text-xs font-bold text-emerald-400">${p.rev.toLocaleString()}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                <div>
                  <div>Clicks: <span className="font-semibold text-white">{p.clicks}</span></div>
                </div>
                <div>
                  <div>Sales: <span className="font-semibold text-white">{p.conv}</span></div>
                </div>
              </div>

              <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                <div 
                  className="h-full rounded-full" 
                  style={{ width: `${Math.min(100, (p.rev / 2500) * 100)}%`, backgroundColor: p.color }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
