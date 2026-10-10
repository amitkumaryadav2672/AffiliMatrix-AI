import React, { useState } from 'react';
import { 
  Sparkles, 
  Video, 
  ShieldCheck, 
  Sliders, 
  Send, 
  Copy, 
  Check, 
  FileText
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function ContentStudio() {
  const { 
    products, 
    selectedProductForStudio, 
    generateContent, 
    contentItems, 
    setActivePage,
    showToast 
  } = useAffiliate();

  const [activeProduct, setActiveProduct] = useState(selectedProductForStudio || products[0]);
  const [angle, setAngle] = useState('problem-solution');
  const [tone, setTone] = useState('authentic-creator');
  const [captionPlatform, setCaptionPlatform] = useState('tiktok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedItem, setGeneratedItem] = useState(contentItems[0] || null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!activeProduct) return;
    setIsGenerating(true);
    try {
      const item = await generateContent({ productId: activeProduct.id, angle, tone });
      setGeneratedItem(item);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            AI Content <span className="glow-gradient-text">Studio & Script Engine</span>
          </h2>
          <p className="text-sm text-slate-400">
            Generate high-converting multi-platform video scripts, captions, and commercial disclosures.
          </p>
        </div>

        {generatedItem && (
          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FTC Score: {generatedItem.complianceScore || 98}/100</span>
            </span>

            <button
              onClick={() => {
                showToast(`Content submitted for human review.`);
                setActivePage('calendar');
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-semibold text-xs shadow-md shadow-emerald-600/30 hover:scale-[1.02] transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Queue for Review</span>
            </button>
          </div>
        )}
      </div>

      {/* Control Box */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Target Affiliate Product</label>
            <select
              value={activeProduct?.id || ''}
              onChange={(e) => setActiveProduct(products.find(p => p.id === e.target.value))}
              className="w-full px-3 py-2.5 rounded-xl bg-[#181b29] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.commissionRate})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span>Marketing Angle / Hook Archetype</span>
            </label>
            <select
              value={angle}
              onChange={(e) => setAngle(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#181b29] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="problem-solution">Problem-Agitation-Solution (High Conversion)</option>
              <option value="myth-buster">Myth-Buster / Contrarian Insight</option>
              <option value="workflow-transformation">10-Minute Workflow Transformation</option>
              <option value="direct-comparison">Tool Comparison vs Generic Alternative</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Creator Voice & Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#181b29] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="authentic-creator">Authentic Creator (Relatable, Honest)</option>
              <option value="high-energy-tech">High-Energy Tech Reviewer (Snappy, Visual)</option>
              <option value="professional-executive">Executive / Thought Leader (Strategic)</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="text-xs text-slate-400">
            Generates 9:16 vertical script + captions for X, Shorts, TikTok, Instagram, LinkedIn, Pinterest.
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-4 h-4 text-cyan-200 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>{isGenerating ? 'Synthesizing Studio Package...' : 'Generate Multi-Platform Package'}</span>
          </button>
        </div>
      </div>

      {/* Generated Content Studio Display */}
      {generatedItem && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Script Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-['Outfit']">Short-Form Video Script & Storyboard</h3>
                    <p className="text-xs text-slate-400">Designed for 9:16 vertical retention (Shorts, TikTok, Reels)</p>
                  </div>
                </div>

                <button
                  onClick={() => copyText(`${generatedItem.script?.hook}\n\n${generatedItem.script?.body}\n\n${generatedItem.script?.cta}`)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer px-2.5 py-1 rounded-lg bg-white/5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Script'}</span>
                </button>
              </div>

              {/* Hook (0-3s) */}
              <div className="p-4 rounded-xl bg-black/25 border border-indigo-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-indigo-400 uppercase tracking-wider text-[10px]">
                    0:00 - 0:03 • The Hook (Pattern Interrupt)
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Max Attention</span>
                </div>
                <p className="text-sm text-slate-100 font-medium leading-relaxed italic">
                  "{generatedItem.script?.hook}"
                </p>
                <div className="text-[11px] text-indigo-300/80 bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10">
                  <span className="font-semibold">Visual Cue:</span> {generatedItem.script?.visualDirectionHook}
                </div>
              </div>

              {/* Body (0:03 - 0:45) */}
              <div className="p-4 rounded-xl bg-black/25 border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-cyan-400 uppercase tracking-wider text-[10px]">
                    0:03 - 0:45 • Problem Breakdown & Live Demo
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Value & Retention</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {generatedItem.script?.body}
                </p>
                <div className="text-[11px] text-cyan-300/80 bg-cyan-500/5 p-2 rounded-lg border border-cyan-500/10">
                  <span className="font-semibold">Visual Cue:</span> {generatedItem.script?.visualDirectionBody}
                </div>
              </div>

              {/* CTA (0:45 - 0:60) */}
              <div className="p-4 rounded-xl bg-black/25 border border-emerald-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px]">
                    0:45 - 0:60 • Call To Action & Bio Direction
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono">Conversion Focus</span>
                </div>
                <p className="text-sm text-slate-100 font-medium leading-relaxed italic">
                  "{generatedItem.script?.cta}"
                </p>
                <div className="text-[11px] text-emerald-300/80 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                  <span className="font-semibold">Visual Cue:</span> {generatedItem.script?.visualDirectionCta}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Platform-Specific Captions */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-panel rounded-2xl p-6 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white font-['Outfit']">Channel-Optimized Captions</h3>
                <span className="text-[11px] text-slate-400">Tailored formatting</span>
              </div>

              <div className="grid grid-cols-6 gap-1 bg-black/30 p-1 rounded-xl border border-white/5 text-[11px] font-semibold">
                {['x', 'youtube', 'tiktok', 'instagram', 'linkedin', 'pinterest'].map(plat => (
                  <button
                    key={plat}
                    onClick={() => setCaptionPlatform(plat)}
                    className={`py-1.5 rounded-lg text-center uppercase tracking-wider transition cursor-pointer ${
                      captionPlatform === plat 
                        ? 'bg-indigo-600 text-white font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {plat === 'youtube' ? 'Shorts' : plat}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-black/25 border border-white/10 text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap min-h-[160px] max-h-[220px] overflow-y-auto">
                {generatedItem.platformCaptions?.[captionPlatform] || generatedItem.caption}
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Mandatory FTC Commercial Disclosure:</span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  "{generatedItem.affiliateDisclosure}"
                </p>
              </div>

              <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                <img 
                  src={generatedItem.thumbnail || generatedItem.mediaUrl} 
                  alt="Video thumbnail"
                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4">
                  <div className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider">Vertical Asset (9:16)</div>
                  <div className="text-xs font-bold text-white line-clamp-1">{generatedItem.title}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  showToast('Submitted to Human Review Queue!');
                  setActivePage('calendar');
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit to Human Review Queue</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
