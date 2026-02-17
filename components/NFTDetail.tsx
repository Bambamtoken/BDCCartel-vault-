import React, { useState } from 'react';
import { NFT } from '../types';
import { ArrowLeft, Share2, ExternalLink, TrendingUp, Send, DollarSign, Activity, ShieldCheck, Globe, MapPin } from 'lucide-react';

interface NFTDetailProps {
  nft: NFT;
  onBack: () => void;
}

const EXCHANGE_RATES = {
  USD: { rate: 2800, symbol: '$' },
  EUR: { rate: 2600, symbol: '€' },
  GBP: { rate: 2200, symbol: '£' },
  JPY: { rate: 420000, symbol: '¥' }
};

type Currency = keyof typeof EXCHANGE_RATES;

export const NFTDetail: React.FC<NFTDetailProps> = ({ nft, onBack }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertedValue = (nft.value * EXCHANGE_RATES[currency].rate).toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  });

  return (
    <div className="animate-fade-in pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-white/5"
        >
          <ArrowLeft size={20} />
        </button>
        <span className="font-semibold text-lg text-gold-500 uppercase tracking-widest">Asset Details</span>
        <button className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-white/5">
          <Share2 size={18} />
        </button>
      </div>

      <div className="space-y-6">
        {/* Image Card */}
        <div className="glass-panel p-2 rounded-3xl relative overflow-hidden border border-gold-500/30">
          <div className="aspect-square rounded-2xl overflow-hidden relative">
            <img 
              src={nft.imageUrl} 
              alt={nft.name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-2 border border-gold-500/20">
              <ShieldCheck size={14} className="text-gold-500" />
              <span className="text-xs font-bold text-white tracking-wide uppercase">Official BDC</span>
            </div>
          </div>
        </div>

        {/* Title & Price */}
        <div className="glass-panel p-6 rounded-3xl space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-gold-500 text-xs font-bold tracking-[0.2em] uppercase mb-1 block">{nft.collection}</span>
              <h1 className="text-2xl font-bold text-white">{nft.name}</h1>
            </div>
            <div className="flex items-center gap-1.5 bg-neutral-900 px-3 py-1.5 rounded-lg border border-white/10">
              <Activity size={14} className="text-neutral-400" />
              <span className="text-xs text-neutral-300">#001</span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-neutral-400 text-sm">Estimated Value</p>
                <div className="relative group">
                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value as Currency)}
                        className="appearance-none bg-neutral-900 text-[10px] font-bold text-gold-500 py-1 pl-2 pr-6 rounded border border-neutral-700 hover:border-gold-500 focus:outline-none cursor-pointer transition-colors uppercase tracking-wider"
                    >
                        {Object.keys(EXCHANGE_RATES).map(curr => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-1.5 pointer-events-none text-gold-500">
                        <Globe size={10} />
                    </div>
                </div>
              </div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-3xl font-bold text-white">{nft.value} ETH</span>
                <span className="text-neutral-500 font-medium whitespace-nowrap">
                  ≈ {EXCHANGE_RATES[currency].symbol}{convertedValue}
                </span>
              </div>
            </div>
            <div className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-bold ${
              nft.change24h >= 0 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400'
            }`}>
              <TrendingUp size={16} className={nft.change24h < 0 ? 'rotate-180' : ''} />
              {nft.change24h > 0 ? '+' : ''}{nft.change24h}%
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-neutral-900 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors border border-white/10">
            <Send size={18} />
            Transfer
          </button>
          <button className="bg-gold-500 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
            <DollarSign size={18} />
            Sell Asset
          </button>
        </div>

        {/* Real World Location */}
        <div className="glass-panel p-6 rounded-3xl">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Physical Location</h3>
              <MapPin size={16} className="text-gold-500" />
           </div>
           <div className="bg-neutral-900 p-4 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                 <p className="text-xs text-neutral-400 uppercase">Coordinates (Niš)</p>
                 <p className="text-white font-mono text-sm">21.8889765, 43.3219376</p>
              </div>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=43.3219376,21.8889765" 
                target="_blank" 
                rel="noreferrer"
                className="bg-neutral-800 hover:bg-neutral-700 text-gold-500 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
              >
                View Map
              </a>
           </div>
        </div>

        {/* Attributes Mockup */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="font-bold text-white mb-4">Attributes</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Faction', value: 'Cartel Founder', rarity: '1%' },
              { label: 'Background', value: 'Matte Black', rarity: '5%' },
              { label: 'Access', value: 'Level 5 (Max)', rarity: '0.1%' },
              { label: 'Origin', value: 'Balkan Drill', rarity: '100%' },
            ].map((attr, i) => (
              <div key={i} className="bg-neutral-900/50 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gold-500 font-bold uppercase mb-1">{attr.label}</p>
                <p className="text-slate-200 font-semibold text-sm">{attr.value}</p>
                <p className="text-[10px] text-neutral-500 mt-1">{attr.rarity} rarity</p>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-4 text-neutral-500 font-medium flex items-center justify-center gap-2 hover:text-white transition-colors">
          <ExternalLink size={16} />
          View on PolygonScan
        </button>
      </div>
    </div>
  );
};