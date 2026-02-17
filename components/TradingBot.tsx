
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bot, Play, Pause, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { TradePosition } from '../types';
import { getTradingSignal } from '../services/geminiService';

interface TradingBotProps {
  onBack: () => void;
  onProfit: (amount: number) => void;
}

export const TradingBot: React.FC<TradingBotProps> = ({ onBack, onProfit }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [positions, setPositions] = useState<TradePosition[]>([]);
  const [lastSignal, setLastSignal] = useState<string>("Analyzing market structure...");
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRunning) {
      interval = setInterval(async () => {
        // Update PNL of existing positions
        setPositions(prev => prev.map(pos => {
            const pnlChange = (Math.random() - 0.45) * 5; // Slight bias to profit
            return { ...pos, pnl: pos.pnl + pnlChange };
        }));

        // Randomly close positions
        if (positions.length > 0 && Math.random() > 0.8) {
            const posToClose = positions[0];
            if (posToClose.pnl > 0) {
                onProfit(posToClose.pnl);
            }
            setPositions(prev => prev.slice(1));
        }

        // Open new position
        if (positions.length < 3 && Math.random() > 0.7) {
            const signal = await getTradingSignal("Volatile, upward trend");
            setLastSignal(`Signal: ${signal.action} ${signal.pair} (${signal.confidence}% Conf)`);
            
            if (signal.action !== 'HOLD') {
                const newPos: TradePosition = {
                    id: Date.now().toString(),
                    pair: signal.pair,
                    type: signal.action as 'LONG' | 'SHORT',
                    entryPrice: 0, // Mock
                    currentPrice: 0,
                    pnl: 0,
                    leverage: 10,
                    status: 'OPEN'
                };
                setPositions(prev => [...prev, newPos]);
            }
        }
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isRunning, positions, onProfit]);

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
            <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-white/5"
            >
            <ArrowLeft size={20} />
            </button>
            <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Bot size={20} className="text-emerald-500" />
                Robot Expert
            </h2>
            <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <p className="text-[10px] text-neutral-500 font-mono uppercase">
                    STATUS: {isRunning ? 'ENGAGED' : 'STANDBY'}
                </p>
            </div>
            </div>
        </div>
        
        <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                isRunning 
                ? 'bg-neutral-900 text-rose-500 border border-rose-500/30 hover:bg-rose-900/10' 
                : 'bg-emerald-500 text-black hover:bg-emerald-400 shadow-emerald-500/20'
            }`}
        >
            {isRunning ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
        </button>
      </div>

      {/* AI Insight */}
      <div className="bg-neutral-900/50 p-4 rounded-2xl border border-white/5 mb-6">
        <div className="flex items-center gap-2 mb-2">
            <RefreshCcw size={14} className={`text-gold-500 ${isRunning ? 'animate-spin' : ''}`} />
            <span className="text-xs font-bold text-gold-500 uppercase">Gemini Analysis</span>
        </div>
        <p className="text-sm text-neutral-300 font-mono">{lastSignal}</p>
      </div>

      {/* Active Positions */}
      <h3 className="text-sm font-bold text-white mb-3">Active Positions (High Freq)</h3>
      <div className="space-y-3">
        {positions.length === 0 ? (
            <div className="text-center py-10 border border-dashed border-neutral-800 rounded-2xl">
                <p className="text-neutral-600 text-xs">NO ACTIVE TRADES</p>
                {isRunning && <p className="text-emerald-500 text-xs mt-2 animate-pulse">Scanning market...</p>}
            </div>
        ) : (
            positions.map((pos) => (
                <div key={pos.id} className="glass-panel p-4 rounded-xl border border-white/5 relative overflow-hidden">
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${pos.type === 'LONG' ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                    <div className="flex justify-between items-start mb-2 pl-3">
                        <div>
                            <span className="text-white font-bold text-lg">{pos.pair}</span>
                            <span className={`ml-2 text-[10px] px-1.5 py-0.5 rounded font-bold ${
                                pos.type === 'LONG' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                                {pos.type} {pos.leverage}x
                            </span>
                        </div>
                        <div className={`font-mono font-bold ${pos.pnl >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {pos.pnl >= 0 ? '+' : ''}{pos.pnl.toFixed(2)} USD
                        </div>
                    </div>
                    <div className="flex justify-between items-center pl-3">
                        <span className="text-xs text-neutral-500">Entry: Market</span>
                        <div className="flex items-center gap-1">
                            {pos.pnl >= 0 ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-rose-500" />}
                            <span className="text-xs text-neutral-400">Live P&L</span>
                        </div>
                    </div>
                </div>
            ))
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-neutral-900 p-4 rounded-xl">
            <p className="text-[10px] text-neutral-500 uppercase">Total Profit (24h)</p>
            <p className="text-xl font-bold text-emerald-400">+$2,450.00</p>
        </div>
        <div className="bg-neutral-900 p-4 rounded-xl">
            <p className="text-[10px] text-neutral-500 uppercase">Win Rate</p>
            <p className="text-xl font-bold text-gold-500">88.4%</p>
        </div>
      </div>
    </div>
  );
};
