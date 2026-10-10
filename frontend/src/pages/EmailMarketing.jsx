import React, { useState } from 'react';
import { 
  Mail, 
  UserPlus, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  Users, 
  Sparkles,
  X
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';
import { formatDateTime } from '../utils/formatters';

export default function EmailMarketing() {
  const { subscribers, sequences, addSubscriber } = useAffiliate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSub, setNewSub] = useState({
    email: '',
    name: '',
    sourceCampaign: 'Q4 Creator Productivity',
    tags: 'productivity, saas-tools'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newSub.email) return;
    addSubscriber({
      email: newSub.email,
      name: newSub.name,
      sourceCampaign: newSub.sourceCampaign,
      tags: newSub.tags.split(',').map(t => t.trim())
    });
    setShowAddModal(false);
    setNewSub({ email: '', name: '', sourceCampaign: 'Q4 Creator Productivity', tags: 'productivity, saas-tools' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Email Marketing & <span className="glow-gradient-text">Opt-In Funnels</span>
          </h2>
          <p className="text-sm text-slate-400">
            Compliant consent-based email follow-ups with double opt-in records and automated welcome sequences.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/20"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Subscriber</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Verified Subscribers</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-['Outfit']">{subscribers?.length || 0}</div>
          <div className="text-[11px] text-emerald-400 font-semibold mt-1">100% CAN-SPAM compliant opt-ins</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Active Automated Sequences</span>
            <Mail className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400 font-['Outfit']">{sequences?.length || 1}</div>
          <div className="text-[11px] text-slate-400 mt-1">54.2% average open rate</div>
        </div>

        <div className="glass-panel rounded-2xl p-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
            <span>Affiliate Click-Through Rate</span>
            <Sparkles className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-purple-400 font-['Outfit']">18.6%</div>
          <div className="text-[11px] text-purple-400/80 font-semibold mt-1">Nurtured buyer intent</div>
        </div>
      </div>

      {/* Active Welcome Sequences */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <h3 className="text-base font-bold text-white font-['Outfit']">Automated Drip & Recommendation Sequences</h3>
        
        <div className="space-y-3">
          {(sequences || []).map((seq) => (
            <div key={seq.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">{seq.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Trigger: {seq.triggersOn}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {seq.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                {seq.steps?.map((step, i) => (
                  <div key={i} className="p-3 rounded-lg bg-black/30 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-indigo-400 font-bold">
                      <span>Day {step.day}</span>
                      <span className="text-slate-400">{step.opens} open</span>
                    </div>
                    <div className="text-slate-200 text-[11px] line-clamp-1">{step.subject}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white font-['Outfit']">Subscriber Consent Ledger</h3>
          <span className="text-xs text-slate-400">Explicit consent records stored</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black/30 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
              <tr>
                <th className="py-3 px-4">Subscriber</th>
                <th className="py-3 px-4">Consent Verification</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Joined At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {(subscribers || []).map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02]">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">{sub.name || 'Subscriber'}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{sub.email}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{sub.consentRecord}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 uppercase">
                      {sub.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                    {formatDateTime(sub.subscribedAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-md rounded-2xl p-6 border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Add Opt-In Subscriber</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={newSub.email}
                  onChange={(e) => setNewSub({ ...newSub, email: e.target.value })}
                  placeholder="subscriber@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Name</label>
                <input
                  type="text"
                  value={newSub.name}
                  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  placeholder="e.g. Alex"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tags</label>
                <input
                  type="text"
                  value={newSub.tags}
                  onChange={(e) => setNewSub({ ...newSub, tags: e.target.value })}
                  placeholder="productivity, creator"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 font-semibold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 cursor-pointer shadow-md shadow-indigo-600/30"
                >
                  Save Subscriber
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
