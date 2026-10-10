import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Send, 
  Smartphone, 
  Calendar, 
  Clock, 
  Eye, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function ApprovalQueueTab({ 
  contentItems, 
  onApproveAndSchedule, 
  onReject, 
  onNavigateTab 
}) {
  const pendingItems = (contentItems || []).filter(c => c.approvalStatus === 'pending_approval');
  const approvedItems = (contentItems || []).filter(c => c.approvalStatus === 'approved');

  const [selectedItem, setSelectedItem] = useState(pendingItems[0] || approvedItems[0] || null);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState('tiktok');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']);

  const togglePlatform = (p) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Human Approval <span className="glow-gradient-text">Governance Gate</span>
          </h2>
          <p className="text-sm text-slate-400">
            Mandatory supervisor review to ensure authenticity, verify claims, and prevent unauthorized automation.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold">
            {pendingItems.length} Awaiting Supervisor Decision
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold">
            {approvedItems.length} Approved & Active
          </span>
        </div>
      </div>

      {pendingItems.length === 0 && !selectedItem ? (
        <div className="glass-panel rounded-2xl p-12 text-center border border-dashed border-white/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white font-['Outfit']">All Content Reviewed & Cleared</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            No items are waiting in the human approval queue. Generate a new campaign in the Content Studio to review fresh promotional assets.
          </p>
          <button
            onClick={() => onNavigateTab('studio')}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition cursor-pointer"
          >
            Open AI Content Studio
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: List of items awaiting decision */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Queue Items ({pendingItems.length + approvedItems.length})
            </h3>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {[...pendingItems, ...approvedItems].map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isPending = item.approvalStatus === 'pending_approval';

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/15'
                        : 'glass-panel hover:bg-white/[0.05] border-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isPending 
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {isPending ? 'Pending Review' : 'Approved'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Score: {item.complianceScore}/100
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 mb-1.5">
                      {item.title}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                      <span className="capitalize">{item.mediaType?.replace('_', ' ')}</span>
                      <span className="text-indigo-400 font-medium">Click to inspect →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Platform Preview & Decision Console */}
          {selectedItem && (
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
                {/* Review Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                      Supervisor Inspection View
                    </span>
                    <h3 className="text-base font-bold text-white font-['Outfit'] mt-0.5">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Score: {selectedItem.complianceScore}/100</span>
                    </span>
                  </div>
                </div>

                {/* Preview Platform Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-300">Channel Preview Format:</span>
                    <span className="text-[11px] text-slate-400 capitalize">Simulating {activePreviewPlatform} native UI</span>
                  </div>

                  <div className="grid grid-cols-6 gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px] font-semibold">
                    {['tiktok', 'youtube', 'instagram', 'x', 'linkedin', 'pinterest'].map(plat => (
                      <button
                        key={plat}
                        onClick={() => setActivePreviewPlatform(plat)}
                        className={`py-1.5 rounded-lg text-center uppercase tracking-wider transition cursor-pointer ${
                          activePreviewPlatform === plat 
                            ? 'bg-indigo-600 text-white font-bold' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {plat === 'youtube' ? 'Shorts' : plat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Native Social Mockup Preview Frame */}
                <div className="rounded-2xl bg-black/40 border border-white/10 p-4 space-y-3">
                  {/* Smartphone format for TikTok / Shorts / Reels */}
                  {['tiktok', 'youtube', 'instagram'].includes(activePreviewPlatform) ? (
                    <div className="max-w-xs mx-auto rounded-3xl overflow-hidden border-2 border-white/15 bg-slate-950 shadow-2xl relative">
                      {/* Video Media Container */}
                      <div className="relative h-96 w-full overflow-hidden bg-slate-900">
                        <img 
                          src={selectedItem.mediaUrl || selectedItem.thumbnail} 
                          alt="Video Preview"
                          className="w-full h-full object-cover" 
                        />
                        {/* Overlay Controls */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-between p-4">
                          <div className="flex items-center justify-between text-[10px] text-white/80 font-bold">
                            <span className="bg-black/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {activePreviewPlatform.toUpperCase()}
                            </span>
                            <span className="bg-emerald-500/80 text-black px-2 py-0.5 rounded-full font-extrabold text-[9px]">
                              #AD DISCLOSURE ON
                            </span>
                          </div>

                          <div className="space-y-2 text-white">
                            <div className="text-xs font-bold leading-tight drop-shadow-md">
                              {selectedItem.script?.hook}
                            </div>
                            <div className="text-[11px] text-white/90 line-clamp-3 leading-snug drop-shadow">
                              {selectedItem.platformCaptions?.[activePreviewPlatform] || selectedItem.caption}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Desktop / Feed Card for X, LinkedIn, Pinterest */
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                          AV
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">TechVibe Official</div>
                          <div className="text-[10px] text-slate-400 capitalize">Posting to {activePreviewPlatform}</div>
                        </div>
                      </div>

                      <div className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                        {selectedItem.platformCaptions?.[activePreviewPlatform] || selectedItem.caption}
                      </div>

                      {selectedItem.mediaUrl && (
                        <div className="rounded-xl overflow-hidden border border-white/10 max-h-56">
                          <img src={selectedItem.mediaUrl} alt="Media" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Target Platforms Checkboxes for Publishing */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-300">
                    Publishing Target Channels:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'x', label: 'X (Twitter)' },
                      { id: 'youtube', label: 'YouTube Shorts' },
                      { id: 'tiktok', label: 'TikTok' },
                      { id: 'instagram', label: 'Instagram Reels' },
                      { id: 'linkedin', label: 'LinkedIn' },
                      { id: 'pinterest', label: 'Pinterest' }
                    ].map(p => {
                      const active = selectedPlatforms.includes(p.id);
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => togglePlatform(p.id)}
                          className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition cursor-pointer ${
                            active
                              ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          {active ? '✓ ' : ''}{p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Decision Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => onReject(selectedItem.id, 'Supervisor rejected content during review')}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-semibold text-xs hover:bg-red-500/25 transition cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Reject & Request Changes</span>
                    </button>
                  </div>

                  <button
                    onClick={() => onApproveAndSchedule(selectedItem.id, selectedPlatforms)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 hover:scale-[1.02] transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve & Schedule Across {selectedPlatforms.length} Platforms</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
