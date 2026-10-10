import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  MousePointerClick, 
  Sparkles,
  X
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function Campaigns() {
  const { campaigns, products, addCampaign, setActivePage } = useAffiliate();
  const [showModal, setShowModal] = useState(false);
  const [newCamp, setNewCamp] = useState({
    name: '',
    objective: 'Drive trials and sales for high-ticket SaaS tools',
    productIds: [],
    targetAudience: 'Content creators, freelancers, and remote developers',
    platforms: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCamp.name) return;
    addCampaign(newCamp);
    setShowModal(false);
    setNewCamp({
      name: '',
      objective: 'Drive trials and sales for high-ticket SaaS tools',
      productIds: [],
      targetAudience: 'Content creators, freelancers, and remote developers',
      platforms: ['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Marketing <span className="glow-gradient-text">Campaigns</span>
          </h2>
          <p className="text-sm text-slate-400">
            Organize multi-channel promotional thrusts, bundle products, and monitor aggregate performance.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {campaigns.map((camp) => (
          <div key={camp.id} className="glass-panel glass-panel-hover rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                {camp.status || 'Active'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {camp.platforms?.length || 6} Target Channels
              </span>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">{camp.name}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{camp.objective}</p>
            </div>

            <div className="p-3 rounded-xl bg-black/25 border border-white/5 space-y-1 text-xs">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Target Audience Profile</span>
              <div className="text-slate-200">{camp.targetAudience}</div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] text-slate-400">Clicks</div>
                <div className="font-bold text-cyan-400 mt-0.5">{camp.totalClicks || 1420}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] text-slate-400">Sales</div>
                <div className="font-bold text-white mt-0.5">{camp.conversions || 78}</div>
              </div>
              <div className="p-2 rounded-xl bg-white/[0.02]">
                <div className="text-[10px] text-slate-400">Revenue</div>
                <div className="font-bold text-emerald-400 mt-0.5">${camp.revenue || '1,840'}</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActivePage('studio')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-500 text-indigo-300 font-semibold text-xs hover:bg-indigo-600/40 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Content for Campaign</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Launch New Campaign</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={newCamp.name}
                  onChange={(e) => setNewCamp({ ...newCamp, name: e.target.value })}
                  placeholder="e.g. Q4 High-Converting Creator Tools Push"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Objective</label>
                <input
                  type="text"
                  value={newCamp.objective}
                  onChange={(e) => setNewCamp({ ...newCamp, objective: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Audience</label>
                <input
                  type="text"
                  value={newCamp.targetAudience}
                  onChange={(e) => setNewCamp({ ...newCamp, targetAudience: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-semibold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  Create Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
