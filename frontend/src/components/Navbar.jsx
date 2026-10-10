import React, { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  ShieldCheck, 
  Power, 
  Layers, 
  Activity, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export default function Navbar({ 
  killSwitchActive, 
  onToggleKillSwitch, 
  pendingCount = 0, 
  activeTab, 
  setActiveTab 
}) {
  const [confirmKill, setConfirmKill] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c0e17]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand */}
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
                Autonomous + Human-Gated
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Multi-Platform Marketing Engine & FTC Compliance Guardian
            </p>
          </div>
        </div>

        {/* Global Controls & Emergency Kill Switch */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Simulation Mode Tag */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Sandbox Mode (API Quota Protected)</span>
          </div>

          {/* Pending Approval Badge */}
          {pendingCount > 0 && (
            <button
              onClick={() => setActiveTab('approvals')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold hover:bg-amber-500/25 transition cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>{pendingCount} Awaiting Review</span>
            </button>
          )}

          {/* Emergency Kill Switch */}
          <div className="relative">
            <button
              onClick={() => {
                if (!killSwitchActive && !confirmKill) {
                  setConfirmKill(true);
                  setTimeout(() => setConfirmKill(false), 4000);
                } else {
                  onToggleKillSwitch(!killSwitchActive);
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
              title="Instantly stop all scheduled posts across all social accounts"
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
          </div>

          {/* User Avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" 
              alt="Supervisor" 
              className="w-8 h-8 rounded-full ring-1 ring-indigo-500/40 object-cover"
            />
            <div className="hidden lg:block text-left">
              <div className="text-xs font-semibold text-slate-200">Alex Vance</div>
              <div className="text-[10px] text-indigo-400">Campaign Lead</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
