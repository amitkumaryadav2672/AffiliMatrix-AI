import React from 'react';
import { 
  DollarSign, 
  MousePointerClick, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';

export default function DashboardTab({ 
  analytics, 
  auditLogs, 
  onNavigateTab, 
  killSwitchActive 
}) {
  const overview = analytics?.overview || {
    totalRevenue: '$5,610.50',
    totalClicks: 4910,
    totalConversions: 260,
    epc: '$1.14',
    conversionRate: '5.3%',
    publishedCount: 12,
    queuedCount: 6,
    pendingApprovals: 2
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
    <div className="space-y-8 animate-fadeIn">
      {/* Kill Switch Warning Banner if active */}
      {killSwitchActive && (
        <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
              <AlertCircle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-red-200">Global Emergency Kill Switch Engaged</h4>
              <p className="text-xs text-red-400">All outbound social scheduling and publishing is paused across all accounts.</p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('queue')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-500/20 text-red-200 hover:bg-red-500/30 transition cursor-pointer"
          >
            Manage Queue
          </button>
        </div>
      )}

      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
            Autonomous Marketing <span className="glow-gradient-text">Command Center</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Human-supervised multi-platform deployment • Multi-network affiliate attribution
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('studio')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>Generate New Campaign</span>
          </button>

          <button
            onClick={() => onNavigateTab('approvals')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-semibold text-sm hover:bg-white/10 transition cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Review Queue ({overview.pendingApprovals || 0})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Revenue */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Net Revenue</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit']">{overview.totalRevenue}</div>
          <div className="text-[11px] text-emerald-400/80 mt-1 flex items-center gap-1 font-semibold">
            <span>+18.4%</span> this week
          </div>
        </div>

        {/* Tracked Clicks */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Affiliate Clicks</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400 font-['Outfit']">{overview.totalClicks.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Across 6 social feeds
          </div>
        </div>

        {/* Conversions */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Conversions</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Outfit']">{overview.totalConversions}</div>
          <div className="text-[11px] text-indigo-400 mt-1 font-semibold">
            {overview.conversionRate} avg conv.
          </div>
        </div>

        {/* EPC */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>Earnings / Click</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-400 font-['Outfit']">{overview.epc}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            High buyer intent
          </div>
        </div>

        {/* Queued Posts */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>In Queue</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-['Outfit']">{overview.queuedCount}</div>
          <div className="text-[11px] text-blue-400 mt-1 font-semibold">
            Automated calendar
          </div>
        </div>

        {/* Compliance Rating */}
        <div className="glass-panel glass-panel-hover rounded-2xl p-4">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium mb-2">
            <span>FTC Health</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-['Outfit']">100%</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">
            Zero FTC flags
          </div>
        </div>
      </div>

      {/* Grid: Platform Revenue + Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Multi-Platform Performance Breakdown */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">Multi-Platform Channel Attribution</h3>
              <p className="text-xs text-slate-400">Revenue and affiliate conversions by active publishing adapter</p>
            </div>
            <button 
              onClick={() => onNavigateTab('platforms')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <span>Adapter Status</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {platforms.map((p) => {
              const maxRev = 2500;
              const pct = Math.min(100, Math.round((p.rev / maxRev) * 100));
              return (
                <div key={p.platform} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }}></span>
                      <span className="font-semibold text-slate-200">{p.platform}</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-400 font-mono">
                      <span>{p.clicks} clicks</span>
                      <span className="text-slate-300 font-semibold">{p.conv} sales</span>
                      <span className="text-emerald-400 font-bold">${p.rev.toLocaleString()}</span>
                    </div>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500" 
                      style={{ width: `${pct}%`, backgroundColor: p.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Tracking attribution window: 30-day click attribution</span>
            <span className="text-indigo-400 font-medium">All adapters healthy</span>
          </div>
        </div>

        {/* Live Audit Log Stream */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white font-['Outfit']">Live Governance & Audit Log</h3>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Complete traceability of every AI generation, human approval, and publishing event.
            </p>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {(auditLogs || []).slice(0, 6).map((log) => (
                <div 
                  key={log.id} 
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs hover:bg-white/[0.05] transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-indigo-300">{log.actor}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      log.status === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-400' :
                      log.status === 'BLOCKED' ? 'bg-red-500/10 text-red-400' :
                      'bg-amber-500/10 text-amber-400'
                    }`}>
                      {log.action}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-2">{log.details}</p>
                  <div className="text-[10px] text-slate-500 mt-1 font-mono">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-center">
            <button 
              onClick={() => onNavigateTab('compliance')}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
            >
              View Full Compliance Rulebook →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
