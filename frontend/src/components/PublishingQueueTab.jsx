import React, { useState } from 'react';
import { 
  CalendarClock, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ExternalLink, 
  RotateCw, 
  Filter, 
  Share2,
  Play
} from 'lucide-react';

export default function PublishingQueueTab({ 
  publishJobs, 
  contentItems, 
  onRunJobNow, 
  isPublishing, 
  killSwitchActive 
}) {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredJobs = (publishJobs || []).filter(j => {
    if (filterStatus === 'all') return true;
    return j.status === filterStatus;
  });

  const getPlatformBadge = (platform) => {
    const badges = {
      x: { label: 'X (Twitter)', color: 'bg-sky-500/10 text-sky-400 border-sky-500/20' },
      youtube: { label: 'YouTube Shorts', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
      tiktok: { label: 'TikTok', color: 'bg-teal-500/10 text-teal-400 border-teal-500/20' },
      instagram: { label: 'Instagram Reels', color: 'bg-pink-500/10 text-pink-400 border-pink-500/20' },
      facebook: { label: 'Facebook Page', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      linkedin: { label: 'LinkedIn', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
      pinterest: { label: 'Pinterest', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' }
    };
    return badges[platform] || { label: platform, color: 'bg-slate-500/10 text-slate-400 border-white/10' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Publishing Queue & <span className="glow-gradient-text">Calendar Engine</span>
          </h2>
          <p className="text-sm text-slate-400">
            Automated dispatcher across authorized platform adapters with idempotency & rate limits.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-xl border border-white/5 text-xs">
          {['all', 'queued', 'published', 'failed'].map(s => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg capitalize transition cursor-pointer font-semibold ${
                filterStatus === s
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
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
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No publishing jobs found for filter: <span className="text-white font-semibold">{filterStatus}</span>
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const content = (contentItems || []).find(c => c.id === job.contentId) || {};
                  const badge = getPlatformBadge(job.platform);

                  return (
                    <tr key={job.id} className="hover:bg-white/[0.02] transition">
                      {/* Platform */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${badge.color}`}>
                          {badge.label}
                        </span>
                      </td>

                      {/* Content Title */}
                      <td className="py-3.5 px-4 font-semibold text-white max-w-xs truncate">
                        {content.title || job.contentId}
                      </td>

                      {/* Scheduled Time */}
                      <td className="py-3.5 px-4 text-slate-300 font-mono text-[11px]">
                        {new Date(job.scheduledAt).toLocaleString([], {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>

                      {/* Status */}
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

                      {/* Attempts */}
                      <td className="py-3.5 px-4 text-slate-400 font-mono">
                        {job.attempts || 0} / 3
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {job.status === 'published' && job.postUrl && (
                            <a
                              href={job.postUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                              title="Inspect Live Post"
                            >
                              <span>View Post</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}

                          {job.status === 'queued' && (
                            <button
                              onClick={() => onRunJobNow(job.id)}
                              disabled={isPublishing || killSwitchActive}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] transition cursor-pointer shadow-sm disabled:opacity-50"
                              title="Bypass timer and publish immediately to this network"
                            >
                              <Play className="w-3 h-3" />
                              <span>Publish Now</span>
                            </button>
                          )}

                          {job.status === 'failed' && (
                            <button
                              onClick={() => onRunJobNow(job.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 font-semibold text-[11px] transition cursor-pointer"
                            >
                              <RotateCw className="w-3 h-3" />
                              <span>Retry</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
