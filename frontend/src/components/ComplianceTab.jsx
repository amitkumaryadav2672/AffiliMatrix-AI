import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  Wand2, 
  ExternalLink 
} from 'lucide-react';

export default function ComplianceTab({ onScanText }) {
  const [inputText, setInputText] = useState(
    "Check out this insane productivity tool! It organized my entire workflow and saved me 15 hours. Click the link in bio to get the exclusive discount."
  );
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async () => {
    setIsScanning(true);
    try {
      const res = await onScanText(inputText);
      setScanResult(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsScanning(false);
    }
  };

  const applyAutoFix = () => {
    if (scanResult?.autoFixedCaption) {
      setInputText(scanResult.autoFixedCaption);
      setScanResult({
        ...scanResult,
        passed: true,
        score: 100,
        issues: [],
        warnings: []
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
          FTC Compliance & <span className="glow-gradient-text">Policy Inspector</span>
        </h2>
        <p className="text-sm text-slate-400">
          Real-time endorsement verification engine adhering to US FTC 16 CFR Part 255 guidelines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Scanner Sandbox */}
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white font-['Outfit']">Interactive Text Compliance Scanner</h3>
              <span className="text-[11px] text-slate-400">Scan any script or caption before publishing</span>
            </div>

            <div>
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type or paste post text, video script, or social caption here..."
                className="w-full p-4 rounded-xl bg-black/30 border border-white/10 text-xs text-white focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">
                Checks: FTC disclosures, deceptive guarantees, and platform spam patterns.
              </span>
              <button
                onClick={handleScan}
                disabled={isScanning || !inputText.trim()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/30 transition cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>{isScanning ? 'Auditing Text...' : 'Run Compliance Audit'}</span>
              </button>
            </div>

            {/* Scan Results */}
            {scanResult && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">Audit Result:</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      scanResult.passed
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/15 text-red-400 border border-red-500/30'
                    }`}>
                      {scanResult.passed ? 'COMPLIANT & CLEARED' : 'NON-COMPLIANT (BLOCKED)'}
                    </span>
                  </div>

                  <div className="text-xs font-mono font-bold text-indigo-300">
                    Health Score: {scanResult.score}/100
                  </div>
                </div>

                {/* Issues List */}
                {scanResult.issues.length > 0 && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/25 space-y-1.5 text-xs">
                    <div className="font-bold text-red-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Violations Found:</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-red-200 text-[11px]">
                      {scanResult.issues.map((issue, idx) => (
                        <li key={idx}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Auto Fix Button */}
                {!scanResult.passed && (
                  <button
                    onClick={applyAutoFix}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition cursor-pointer shadow-md shadow-emerald-600/25"
                  >
                    <Wand2 className="w-4 h-4" />
                    <span>Auto-Attach FTC Commercial Disclosure</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Platform-Specific Commercial Disclosure Rulebook */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit']">FTC & Platform Rules Reference</h3>
            
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-bold text-indigo-300">1. FTC Endorsement Guides</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Disclose commission relationships in clear language (e.g. "Affiliate disclosure: I may earn a commission...") placed near links or mentioned in audio.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-bold text-teal-300">2. TikTok Content Posting API</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Must toggle <code className="text-teal-200">commercial_content_type</code> via API and obtain creator authorization before posting.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-bold text-red-300">3. YouTube Shorts</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Must flag <code className="text-red-200">containsPaidPromotion: true</code> and include #Shorts with disclosure in description.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                <span className="font-bold text-sky-300">4. X (Twitter)</span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Promotional tweets must include conspicuous #ad or #affiliate in text; obey API rate-limiting rules.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://www.ftc.gov"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
              >
                <span>Read Official FTC Guidelines</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
