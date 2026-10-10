import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  Play, 
  RotateCw, 
  ShieldCheck, 
  Smartphone,
  CalendarClock
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';
import { formatDateTime } from '../utils/formatters';

export default function ContentCalendar() {
  const { 
    contentItems, 
    publishJobs, 
    approveAndSchedule, 
    rejectContent, 
    runPublishNow, 
    killSwitchActive,
    pendingApprovalsCount 
  } = useAffiliate();

  const [viewTab, setViewTab] = useState(pendingApprovalsCount > 0 ? 'approvals' : 'queue');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest']);
  const [activePreviewPlatform, setActivePreviewPlatform] = useState('tiktok');
  const [isPublishing, setIsPublishing] = useState(false);

  const pendingItems = (contentItems || []).filter(c => c.approvalStatus === 'awaiting_approval' || c.approvalStatus === 'pending_approval');
  const approvedItems = (contentItems || []).filter(c => c.approvalStatus === 'approved');
  const [selectedItem, setSelectedItem] = useState(pendingItems[0] || approvedItems[0] || null);

  const togglePlatform = (p) => {
    if (selectedPlatforms.includes(p)) {
      if (selectedPlatforms.length > 1) setSelectedPlatforms(selectedPlatforms.filter(x => x !== p));
    } else {
      setSelectedPlatforms([...selectedPlatforms, p]);
    }
  };

  const handleApprove = async () => {
    if (!selectedItem) return;
    await approveAndSchedule(selectedItem.id, selectedPlatforms);
    setViewTab('queue');
  };

  const handlePublishNow = async (jobId) => {
    setIsPublishing(true);
    try {
      await runPublishNow(jobId);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header & View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Content Calendar & <span className="glow-gradient-text">Approval Dispatcher</span>
          </h2>
          <p className="text-sm text-slate-400">
            Human-in-the-loop review console and multi-network scheduled publishing engine.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-semibold">
          <button
            onClick={() => setViewTab('approvals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${
              viewTab === 'approvals' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Supervisor Approval Gate</span>
            {pendingApprovalsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-black text-[10px] font-extrabold">
                {pendingApprovalsCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setViewTab('queue')}
            className={`px-4 py-2 rounded-lg transition cursor-pointer ${
              viewTab === 'queue' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Publishing Queue & Timeline ({publishJobs?.length || 0})
          </button>
        </div>
      </div>

      {/* VIEW 1: SUPERVISOR APPROVAL GATE */}
      {viewTab === 'approvals' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* List of items */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider mb-2">
              Review Queue ({pendingItems.length + approvedItems.length})
            </h3>

            <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
              {[...pendingItems, ...approvedItems].map((item) => {
                const isSelected = selectedItem?.id === item.id;
                const isPending = item.approvalStatus !== 'approved';

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
                        Score: {item.complianceScore || 98}/100
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white line-clamp-2 mb-1.5">{item.title}</h4>
                    <div className="text-[11px] text-slate-400 pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="capitalize">{item.mediaType?.replace('_', ' ')}</span>
                      <span className="text-indigo-400 font-medium">Inspect →</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inspection View */}
          {selectedItem && (
            <div className="lg:col-span-7 space-y-4">
              <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                      Supervisor Inspection View
                    </span>
                    <h3 className="text-base font-bold text-white font-['Outfit'] mt-0.5">
                      {selectedItem.title}
                    </h3>
                  </div>

                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Score: {selectedItem.complianceScore || 98}/100</span>
                  </span>
                </div>

                {/* Channel Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs">
                    <span className="font-semibold text-slate-300">Channel Preview Format:</span>
                    <span className="text-slate-400 capitalize">Simulating {activePreviewPlatform} native UI</span>
                  </div>

                  <div className="grid grid-cols-6 gap-1 bg-black/40 p-1 rounded-xl border border-white/5 text-[11px] font-semibold">
                    {['tiktok', 'youtube', 'instagram', 'x', 'linkedin', 'pinterest'].map(plat => (
                      <button
                        key={plat}
                        onClick={() => setActivePreviewPlatform(plat)}
                        className={`py-1.5 rounded-lg text-center uppercase tracking-wider transition cursor-pointer ${
                          activePreviewPlatform === plat ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {plat === 'youtube' ? 'Shorts' : plat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Smartphone Mockup */}
                <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                  {['tiktok', 'youtube', 'instagram'].includes(activePreviewPlatform) ? (
                    <div className="max-w-xs mx-auto rounded-3xl overflow-hidden border-2 border-white/15 bg-slate-950 shadow-2xl relative">
                      <div className="relative h-96 w-full overflow-hidden bg-slate-900">
                        <img 
                          src={selectedItem.mediaUrl || selectedItem.thumbnail} 
                          alt="Video Preview"
                          className="w-full h-full object-cover" 
                        />
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
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 text-xs">
                      <div className="text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
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

                {/* Target Channels */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-300">Publishing Target Channels:</label>
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
                            active ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
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
                  <button
                    onClick={() => rejectContent(selectedItem.id, 'Supervisor requested modifications')}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-semibold text-xs hover:bg-red-500/25 transition cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject & Request Changes</span>
                  </button>

                  <button
                    onClick={handleApprove}
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

      {/* VIEW 2: PUBLISHING QUEUE & TIMELINE */}
      {viewTab === 'queue' && (
        <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-black/30 border-b border-white/10 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3 px-4">Platform Channel</th>
                  <th className="py-3 px-4">Content Title</th>
                  <th className="py-3 px-4">Scheduled Release</th>
                  <th className="py-3 px-4">Job Status</th>
                  <th className="py-3 px-4">Attempts</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {(publishJobs || []).map((job) => {
                  const content = (contentItems || []).find(c => c.id === job.contentId) || {};
                  return (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3.5 px-4 font-bold uppercase tracking-wider text-indigo-300">
                        {job.platform}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                        {content.title || job.contentId}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {formatDateTime(job.scheduledAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          job.status === 'published' 
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : job.status === 'queued'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                        }`}>
                          {job.status === 'published' && <CheckCircle2 className="w-3 h-3" />}
                          {job.status === 'queued' && <Clock className="w-3 h-3 animate-spin" />}
                          {job.status === 'failed' && <AlertCircle className="w-3 h-3" />}
                          <span>{job.status}</span>
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-mono">{job.attempts || 0} / 3</td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {job.status === 'published' && job.postUrl && (
                            <a
                              href={job.postUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                            >
                              <span>View Post</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {job.status === 'queued' && (
                            <button
                              onClick={() => handlePublishNow(job.id)}
                              disabled={isPublishing || killSwitchActive}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] cursor-pointer disabled:opacity-50"
                            >
                              <Play className="w-3 h-3" />
                              <span>Publish Now</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
