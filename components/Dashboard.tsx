
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownLeft, CreditCard, Wallet, Filter, CheckCircle2, Clock, Gem, Pickaxe, Bot, Coins, Network } from 'lucide-react';
import { Transaction, AppView } from '../types';

interface DashboardProps {
  balance: number;
  bdcBalance: number;
  transactions: Transaction[];
  onNavigate: (view: AppView) => void;
}

const data = [
  { name: 'Mon', value: 980000 },
  { name: 'Tue', value: 995000 },
  { name: 'Wed', value: 990000 },
  { name: 'Thu', value: 1005000 },
  { name: 'Fri', value: 1002000 },
  { name: 'Sat', value: 1015000 },
  { name: 'Sun', value: 1000000 },
];

export const Dashboard: React.FC<DashboardProps> = ({ balance, bdcBalance, transactions, onNavigate }) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'payment' | 'receive' | 'nft_purchase'>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter(tx => {
    const matchesType = typeFilter === 'all' || tx.type === typeFilter;
    return matchesType;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Balances Container */}
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
        {/* Fiat Card */}
        <div className="min-w-[90%] snap-center glass-panel-gold p-8 rounded-3xl relative overflow-hidden group border border-gold-500/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 -mr-16 -mt-16 animate-pulse"></div>
            
            <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-gold-500 font-medium text-xs uppercase tracking-[0.2em]">Fiat Liquidity</h2>
                <Gem size={16} className="text-gold-500 opacity-60" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-8">
                <h1 className="text-4xl font-bold text-white tracking-tight">
                ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h1>
            </div>
            
            <div className="flex gap-4">
                <button 
                onClick={() => onNavigate(AppView.PAY)}
                className="flex-1 bg-gold-500 text-black py-3 rounded-xl font-bold hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                >
                <CreditCard size={18} />
                Transfer
                </button>
                <button className="flex-1 bg-neutral-900/50 text-gold-500 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 border border-gold-500/30">
                <ArrowDownLeft size={18} />
                Receive
                </button>
            </div>
            </div>
        </div>

        {/* BDCC Crypto Card */}
        <div className="min-w-[90%] snap-center bg-neutral-900 p-8 rounded-3xl relative overflow-hidden group border border-emerald-500/30">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-3xl opacity-10 -mr-16 -mt-16 animate-pulse"></div>
            
            <div className="relative z-10">
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-emerald-500 font-medium text-xs uppercase tracking-[0.2em]">Chain Assets</h2>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                  <Network size={10} />
                  <span>5 NODES ACTIVE</span>
                </div>
            </div>
            
            <div className="flex flex-col mb-8">
                <h1 className="text-4xl font-bold text-white tracking-tight font-mono">
                {bdcBalance.toLocaleString()} <span className="text-lg text-emerald-500">BDCC</span>
                </h1>
                <p className="text-xs text-neutral-500 mt-1">Staking APY: 12.5% • Network Hash: 5.2 GH/s</p>
            </div>
            
            <div className="flex gap-4">
                <button 
                onClick={() => onNavigate(AppView.NFT)}
                className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                >
                <Wallet size={18} />
                Manage
                </button>
                <button 
                onClick={() => onNavigate(AppView.MINING)}
                className="flex-1 bg-neutral-900 text-emerald-500 py-3 rounded-xl font-bold hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 border border-emerald-500/30"
                >
                <Pickaxe size={18} />
                Mine
                </button>
            </div>
            </div>
        </div>
      </div>

      {/* Wealth Generators */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate(AppView.MINING)}
          className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-neutral-800 transition-colors group border border-white/5 hover:border-gold-500/30"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center group-hover:bg-gold-500/20 group-hover:text-gold-500 text-neutral-400 transition-colors">
             <Pickaxe size={20} />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wide">Algo Mining</span>
        </button>
        <button 
          onClick={() => onNavigate(AppView.TRADING)}
          className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center gap-2 hover:bg-neutral-800 transition-colors group border border-white/5 hover:border-emerald-500/30"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-500 text-neutral-400 transition-colors">
             <Bot size={20} />
          </div>
          <span className="text-xs font-bold text-white uppercase tracking-wide">Robot Expert</span>
        </button>
      </div>

      {/* Transactions */}
      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-white">Ledger</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 rounded-lg transition-all ${showFilters ? 'bg-gold-500/20 text-gold-500' : 'hover:bg-neutral-800 text-neutral-400'}`}
          >
            <Filter size={20} />
          </button>
        </div>

        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8 text-neutral-500">
              <p>No transactions match filters.</p>
            </div>
          ) : (
            filteredTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-3 hover:bg-neutral-800/50 rounded-xl transition-colors border border-transparent hover:border-white/5">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    tx.currency === 'BDCC' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' :
                    tx.type === 'payment' ? 'bg-neutral-900 border-neutral-800 text-neutral-400' :
                    'bg-gold-500/10 border-gold-500/30 text-gold-500'
                  }`}>
                    {tx.type === 'payment' ? <ArrowUpRight size={18} /> : 
                     tx.type === 'nft_purchase' ? <Wallet size={18} /> :
                     tx.type === 'mining_reward' ? <Pickaxe size={18} /> :
                     tx.type === 'trade_profit' ? <Bot size={18} /> :
                     tx.currency === 'BDCC' ? <Coins size={18} /> :
                     <ArrowDownLeft size={18} />}
                  </div>
                  <div>
                    <p className="text-white font-medium">{tx.merchant || 'Transfer'}</p>
                    <p className="text-xs text-neutral-500">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-semibold block ${
                    ['receive', 'mining_reward', 'trade_profit'].includes(tx.type) ? 'text-emerald-400' : 'text-white'
                  }`}>
                    {['receive', 'mining_reward', 'trade_profit'].includes(tx.type) ? '+' : '-'}{Math.abs(tx.amount).toLocaleString()} {tx.currency}
                  </span>
                  {tx.status === 'pending' && (
                    <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded inline-flex items-center gap-1 mt-1 border border-amber-500/20">
                      <Clock size={8} /> Pending
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
