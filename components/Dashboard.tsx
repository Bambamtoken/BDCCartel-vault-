
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet, Filter, CheckCircle2, Clock, Gem, Pickaxe, Bot, Coins, Network, PlayCircle, Sparkles, Rocket, Globe } from 'lucide-react';
import { Transaction, AppView } from '../types';

interface DashboardProps {
  balance: number;
  bdcBalance: number;
  transactions: Transaction[];
  onNavigate: (view: AppView) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ balance, bdcBalance, transactions, onNavigate }) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'payment' | 'receive' | 'nft_purchase'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter(tx => {
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    return matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
        {/* BDCC Crypto Card - Primary */}
        <div className="min-w-[90%] snap-center glass-panel p-8 rounded-3xl relative overflow-hidden group border border-emerald-500/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -mr-16 -mt-16 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_#10b981]"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                  <h2 className="text-emerald-500 font-bold text-[10px] uppercase tracking-[0.3em]">BDChain Network</h2>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30 text-[9px] text-emerald-400 font-mono">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>SYNC_ONLINE</span>
                  </div>
              </div>
              
              <div className="flex flex-col mb-8">
                  <p className="text-[10px] text-neutral-500 font-mono mb-1">NETWORK_ADDRESS: 0x3F64...B9D1</p>
                  <h1 className="text-4xl font-bold text-white tracking-tight font-mono">
                  {bdcBalance.toLocaleString()} <span className="text-lg text-emerald-500">BDC</span>
                  </h1>
                  <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Hashrate Contribution: 5.2 GH/s</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                  <button 
                  onClick={() => onNavigate(AppView.MINT)}
                  className="bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 border border-emerald-400/30"
                  >
                  <Gem size={16} />
                  Mint NFT
                  </button>
                  <button 
                  onClick={() => onNavigate(AppView.VIDEO_GEN)}
                  className="bg-neutral-900 text-emerald-500 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 border border-emerald-500/30"
                  >
                  <PlayCircle size={16} />
                  Renders
                  </button>
              </div>
            </div>
        </div>

        {/* Fiat Card */}
        <div className="min-w-[90%] snap-center glass-panel p-8 rounded-3xl relative overflow-hidden group border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-2">
                  <h2 className="text-gold-500 font-medium text-xs uppercase tracking-[0.2em]">Off-Chain Liquidity</h2>
                  <Gem size={16} className="text-gold-500 opacity-60" />
              </div>
              <div className="flex items-baseline gap-2 mb-8">
                  <h1 className="text-4xl font-bold text-white tracking-tight">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </h1>
              </div>
              <div className="flex gap-4">
                  <button 
                    onClick={() => onNavigate(AppView.PAY)}
                    className="flex-1 bg-gold-500 text-black py-3 rounded-xl font-bold hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                  >
                    Transfer
                  </button>
                  <button className="flex-1 bg-neutral-900 text-gold-500 py-3 rounded-xl font-bold border border-gold-500/30">
                    Receive
                  </button>
              </div>
            </div>
        </div>
      </div>

      {/* Marketing / Public Portal Card */}
      <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 to-black">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/30">
                <Rocket size={20} />
             </div>
             <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Release Command</h3>
                <p className="text-[10px] text-neutral-500 uppercase">Manage Public Market Presence</p>
             </div>
          </div>
          <button 
            onClick={() => onNavigate(AppView.LAUNCH)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-500 transition-colors uppercase tracking-widest flex items-center gap-2"
          >
            <Globe size={12} />
            Landing Page
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/50 p-3 rounded-xl border border-white/5">
             <p className="text-[9px] text-neutral-500 uppercase font-mono mb-0.5">Community Size</p>
             <p className="text-lg font-black text-white">842.1K</p>
          </div>
          <div className="bg-black/50 p-3 rounded-xl border border-white/5">
             <p className="text-[9px] text-neutral-500 uppercase font-mono mb-0.5">Brand Rating</p>
             <p className="text-lg font-black text-gold-500">EXCELLENT</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        <button onClick={() => onNavigate(AppView.MINING)} className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-emerald-500/10 hover:border-emerald-500/40 transition-all">
          <Pickaxe size={20} className="text-emerald-500" />
          <span className="text-[9px] font-bold text-white uppercase">Mining</span>
        </button>
        <button onClick={() => onNavigate(AppView.VIDEO_GEN)} className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-emerald-500/10 hover:border-emerald-500/40 transition-all">
          <Sparkles size={20} className="text-emerald-500" />
          <span className="text-[9px] font-bold text-white uppercase">Render</span>
        </button>
        <button onClick={() => onNavigate(AppView.TRADING)} className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-emerald-500/10 hover:border-emerald-500/40 transition-all">
          <Bot size={20} className="text-emerald-500" />
          <span className="text-[9px] font-bold text-white uppercase">Trade</span>
        </button>
      </div>

      {/* Ledger */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Network Ledger</h3>
          <button onClick={() => setShowFilters(!showFilters)} className="p-2 rounded-lg text-neutral-500">
            <Filter size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {filteredTransactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-neutral-900/40 rounded-xl border border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                  tx.currency === 'BDCC' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-neutral-800 border-neutral-700 text-neutral-500'
                }`}>
                  {tx.type === 'compute_fee' ? <Sparkles size={16} /> : tx.currency === 'BDCC' ? <Coins size={16} /> : <CreditCard size={16} />}
                </div>
                <div>
                  <p className="text-xs font-bold text-white truncate max-w-[120px]">{tx.merchant}</p>
                  <p className="text-[9px] text-neutral-500 uppercase font-mono">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold font-mono ${tx.amount > 0 ? 'text-emerald-400' : 'text-white'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.currency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
