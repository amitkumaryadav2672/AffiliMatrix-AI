import React from 'react';
import { 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Zap, 
  Sliders, 
  Activity, 
  Lock 
} from 'lucide-react';

export default function PlatformAdaptersTab({ socialAccounts }) {
  const adapterSpecs = [
    {
      platform: 'x',
      name: 'X (Twitter) Adapter',
      version: 'API v2 Compliant',
      format: 'Text (280c) + Rich Media Card',
      disclosureRule: 'In-text #ad or #affiliate tag',
      quota: '94% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    },
    {
      platform: 'youtube',
      name: 'YouTube Shorts Adapter',
      version: 'Data API v3 Resumable',
      format: '9:16 Vertical Video (<60s) + #Shorts',
      disclosureRule: 'containsPaidPromotion: true parameter + desc notice',
      quota: '82% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    },
    {
      platform: 'tiktok',
      name: 'TikTok Content Posting API',
      version: 'v2 Commercial Suite',
      format: '9:16 Vertical HD Video',
      disclosureRule: 'commercial_content_type toggle + human creator consent',
      quota: '88% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    },
    {
      platform: 'instagram',
      name: 'Meta Instagram Graph Adapter',
      version: 'Graph API v21.0',
      format: '9:16 Reels Container + 2200c Caption',
      disclosureRule: 'Meta Paid Partnership label + #ad badge',
      quota: '91% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    },
    {
      platform: 'linkedin',
      name: 'LinkedIn UGC Marketing Adapter',
      version: 'v2 UGC API',
      format: 'Thought Leadership Commentary (3000c)',
      disclosureRule: 'Affiliate Partner Recommendation statement',
      quota: '98% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    },
    {
      platform: 'pinterest',
      name: 'Pinterest Rich Pins Adapter',
      version: 'API v5 Boards',
      format: '2:3 or 9:16 High-Res Graphic + Redirect Link',
      disclosureRule: '#affiliatelink in Pin Description',
      quota: '85% remaining',
      circuitBreaker: 'Optimal / 0 Trips'
    }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
          Platform Adapters & <span className="glow-gradient-text">API Governance</span>
        </h2>
        <p className="text-sm text-slate-400">
          Independent adapter architecture with individualized rate limits, commercial disclosures, and circuit breakers.
        </p>
      </div>

      {/* Grid of Adapters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adapterSpecs.map((spec) => {
          const acc = (socialAccounts || []).find(a => a.platform === spec.platform) || {};

          return (
            <div 
              key={spec.platform}
              className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                    {spec.version}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Connected</span>
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1 font-['Outfit']">{spec.name}</h3>
                <div className="text-xs text-indigo-300 font-mono mb-4">
                  Account: {acc.handle || '@primary_channel'}
                </div>

                {/* Specs List */}
                <div className="space-y-2.5 text-xs">
                  <div className="p-2.5 rounded-xl bg-black/25 border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Media Format Contract</span>
                    <div className="text-slate-200 font-medium">{spec.format}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-black/25 border border-white/5 space-y-1">
                    <span className="text-[10px] text-emerald-400 uppercase font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Commercial Disclosure Enforcement</span>
                    </span>
                    <div className="text-slate-300 text-[11px]">{spec.disclosureRule}</div>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-4 border-t border-white/10 mt-4 flex items-center justify-between text-[11px]">
                <div className="text-slate-400">
                  Daily Limit: <span className="text-white font-bold">{acc.postsToday || 0}/{acc.dailyPostLimit || 10}</span>
                </div>
                <div className="text-slate-400">
                  Circuit Breaker: <span className="text-emerald-400 font-bold">Active</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
