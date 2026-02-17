
import React from 'react';
import { Rocket, ShieldCheck, Globe, Zap, Coins, Users, ArrowRight, Play, Crown, Network } from 'lucide-react';

interface LaunchViewProps {
  onEnter: () => void;
}

export const LaunchView: React.FC<LaunchViewProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen relative overflow-y-auto overflow-x-hidden animate-fade-in bg-black">
      {/* Background Matrix-like Overlay */}
      <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEnTTI3xlB66Y/giphy.gif')] opacity-10 pointer-events-none mix-blend-screen"></div>
      
      {/* Hero Section */}
      <div className="relative z-10 p-6 pt-16 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.4)] border border-emerald-400/50 mb-8 animate-bounce-slow">
          <Crown size={52} className="text-black" />
        </div>
        
        <h1 className="text-5xl font-black text-white tracking-tighter leading-none mb-4 uppercase italic">
          BDC <span className="text-emerald-500">Cartel</span>
        </h1>
        
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Official Global Launch v3.1</span>
        </div>

        <p className="text-lg text-neutral-400 font-medium mb-10 max-w-xs leading-relaxed">
          The ultimate decentralized empire. Private wealth, neural rendering, and Balkan drill energy officially on-chain.
        </p>

        {/* Action Buttons */}
        <div className="w-full space-y-4 mb-16">
          <button 
            onClick={onEnter}
            className="w-full bg-emerald-500 text-black py-5 rounded-2xl font-black text-xl hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] flex items-center justify-center gap-3 active:scale-95 group"
          >
            ENTER THE VAULT
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-neutral-900 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors">
              <Zap size={18} className="text-gold-500" />
              Whitepaper
            </button>
            <button className="bg-neutral-900 border border-white/10 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors">
              <Users size={18} className="text-emerald-500" />
              Community
            </button>
          </div>
        </div>

        {/* Market Stats Grid */}
        <div className="w-full grid grid-cols-2 gap-4 mb-16">
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 text-left">
            <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest mb-1">Market Cap</p>
            <p className="text-2xl font-black text-white">$142.5M</p>
            <p className="text-[10px] text-emerald-400 font-bold font-mono">+24.5% TODAY</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 text-left">
            <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest mb-1">Global Nodes</p>
            <p className="text-2xl font-black text-white">4,882</p>
            <p className="text-[10px] text-neutral-500 font-bold font-mono">FULLY SYNCED</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 text-left">
            <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest mb-1">Floor Price</p>
            <p className="text-2xl font-black text-white">4.2 ETH</p>
            <p className="text-[10px] text-emerald-400 font-bold font-mono">ATH REACHED</p>
          </div>
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 text-left">
            <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-widest mb-1">Volume (24h)</p>
            <p className="text-2xl font-black text-white">8.9M BDC</p>
            <p className="text-[10px] text-neutral-500 font-bold font-mono">LIQUIDITY SECURED</p>
          </div>
        </div>

        {/* Feature Teasers */}
        <div className="w-full space-y-6 text-left mb-20">
          <h3 className="text-sm font-bold text-white uppercase tracking-[0.3em] px-2 mb-4 border-l-4 border-emerald-500 pl-4">Release Features</h3>
          
          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <Network size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Global Empire Hash</h4>
              <p className="text-sm text-neutral-500">Connect your entire digital footprint into one massive mining operation. Monetize your influence.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <Play size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Neural Rendering V2</h4>
              <p className="text-sm text-neutral-500">Industry-leading AI video synthesis integrated directly into your private vault. Create 8k assets.</p>
            </div>
          </div>

          <div className="flex items-start gap-5 group">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-all">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-white font-bold text-lg mb-1">Ghost-Pay Protocol</h4>
              <p className="text-sm text-neutral-500">Near-field communication encryption for untraceable off-chain transactions. Pure privacy.</p>
            </div>
          </div>
        </div>

        {/* Footer Promo */}
        <div className="w-full border-t border-white/5 pt-10 pb-20 text-center">
          <p className="text-[10px] text-neutral-600 font-mono uppercase tracking-widest mb-4">Developed by BamBam Production • BDC Cartel 2025</p>
          <div className="flex justify-center gap-6 text-neutral-500">
             <Globe size={16} className="hover:text-white cursor-pointer" />
             <Zap size={16} className="hover:text-white cursor-pointer" />
             <Users size={16} className="hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};
