import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  AlertTriangle, 
  Search,
  X
} from 'lucide-react';
import { useAffiliate } from '../hooks/useAffiliate';

export default function Products() {
  const { products, addProduct, setSelectedProductForStudio, setActivePage } = useAffiliate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProd, setNewProd] = useState({
    name: '',
    network: 'Impact Radius',
    affiliateUrl: '',
    commissionRate: '30% Recurring',
    price: '$29/mo',
    category: 'Productivity & AI',
    targetAudience: 'Digital creators and remote knowledge workers',
    approvedClaims: 'Helps teams automate repetitive tasks in minutes',
    forbiddenClaims: 'Guaranteed 100% replacement of all human labor'
  });

  const filtered = (products || []).filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.network.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.affiliateUrl) return;

    addProduct({
      ...newProd,
      approvedClaims: newProd.approvedClaims.split('\n').filter(Boolean),
      forbiddenClaims: newProd.forbiddenClaims.split('\n').filter(Boolean)
    });

    setShowAddModal(false);
    setNewProd({
      name: '',
      network: 'Impact Radius',
      affiliateUrl: '',
      commissionRate: '30% Recurring',
      price: '$29/mo',
      category: 'Productivity & AI',
      targetAudience: 'Digital creators and remote knowledge workers',
      approvedClaims: 'Helps teams automate repetitive tasks in minutes',
      forbiddenClaims: 'Guaranteed 100% replacement of all human labor'
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight font-['Outfit']">
            Affiliate Offers & <span className="glow-gradient-text">Product Library</span>
          </h2>
          <p className="text-sm text-slate-400">
            Curated high-converting products with approved claims, commission rates, and compliance bounds.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search products or networks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 w-56"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition cursor-pointer shadow-md shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Offer</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((prod) => (
          <div 
            key={prod.id} 
            className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {prod.network}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {prod.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white mb-1 font-['Outfit']">{prod.name}</h3>
              <p className="text-xs text-slate-400 mb-4 line-clamp-1">{prod.targetAudience}</p>

              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/20 border border-white/5 mb-4 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Commission</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{prod.commissionRate}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Price</div>
                  <div className="text-xs font-bold text-slate-200 mt-0.5">{prod.price}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Avg EPC</div>
                  <div className="text-xs font-bold text-cyan-400 mt-0.5">{prod.epc || '$1.80'}</div>
                </div>
              </div>

              <div className="space-y-3 mb-4 text-xs">
                <div>
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1 text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Approved Product Claims:</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-300 text-[11px]">
                    {(prod.approvedClaims || []).slice(0, 2).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-red-400 font-semibold mb-1 text-[11px]">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Strictly Forbidden Claims:</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-slate-400 text-[11px]">
                    {(prod.forbiddenClaims || []).slice(0, 1).map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <a
                href={prod.affiliateUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
              >
                <span>Check Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => {
                  setSelectedProductForStudio(prod);
                  setActivePage('studio');
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 hover:scale-[1.02] transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Create Campaign with AI</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-6 border border-white/15 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-['Outfit']">Add New Affiliate Offer</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={newProd.name}
                  onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                  placeholder="e.g. Notion AI, Descript, NordVPN"
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Affiliate Network</label>
                  <select
                    value={newProd.network}
                    onChange={(e) => setNewProd({ ...newProd, network: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#181b29] border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Impact Radius">Impact Radius</option>
                    <option value="ShareASale">ShareASale</option>
                    <option value="CJ Affiliate">CJ Affiliate</option>
                    <option value="ClickBank">ClickBank</option>
                    <option value="Direct SaaS Partner">Direct SaaS Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Commission Rate</label>
                  <input
                    type="text"
                    value={newProd.commissionRate}
                    onChange={(e) => setNewProd({ ...newProd, commissionRate: e.target.value })}
                    placeholder="e.g. 40% Recurring"
                    className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Affiliate URL</label>
                <input
                  type="url"
                  required
                  value={newProd.affiliateUrl}
                  onChange={(e) => setNewProd({ ...newProd, affiliateUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Approved Claims</label>
                <textarea
                  rows={2}
                  value={newProd.approvedClaims}
                  onChange={(e) => setNewProd({ ...newProd, approvedClaims: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Forbidden Claims</label>
                <textarea
                  rows={2}
                  value={newProd.forbiddenClaims}
                  onChange={(e) => setNewProd({ ...newProd, forbiddenClaims: e.target.value })}
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
                  Save Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
