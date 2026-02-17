
import React, { useEffect, useState, useRef } from 'react';
import { ArrowLeft, Cpu, Zap, Server, Activity, Pickaxe, Globe, Shield, Coins, Users, Music, ShoppingBag, Radio, Box, Power } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { EmpireNode } from '../types';

interface MiningMonitorProps {
  onBack: () => void;
  onReward: (amount: number) => void;
  bdcBalance: number;
}

const INITIAL_NODES: EmpireNode[] = [
  { id: '1', name: 'Spotify / Apple Music', type: 'streaming', status: 'offline', hashrate: 850 },
  { id: '2', name: 'Niš Server Farm #1', type: 'hardware', status: 'online', hashrate: 4500 },
  { id: '3', name: 'Cartel Merch Store', type: 'commerce', status: 'offline', hashrate: 320 },
  { id: '4', name: 'Uniswap Liquidity V3', type: 'defi', status: 'online', hashrate: 1250 },
  { id: '5', name: 'Sandbox Estate 44,12', type: 'metaverse', status: 'offline', hashrate: 600 }
];

export const MiningMonitor: React.FC<MiningMonitorProps> = ({ onBack, onReward, bdcBalance }) => {
  const [nodes, setNodes] = useState<EmpireNode[]>(INITIAL_NODES);
  const [logs, setLogs] = useState<string[]>([]);
  const [totalHashrate, setTotalHashrate] = useState(0);
  const [isSystemActive, setIsSystemActive] = useState(true);
  const [chartData, setChartData] = useState<{time: string, hash: number}[]>([]);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Calculate total hashrate based on online nodes
  useEffect(() => {
    const activeHash = nodes.reduce((acc, node) => {
      return node.status === 'online' || node.status === 'optimizing' ? acc + node.hashrate : acc;
    }, 0);
    
    // Add some jitter to make it look alive
    const jitter = Math.random() * 150 - 75;
    setTotalHashrate(activeHash > 0 ? activeHash + jitter : 0);
  }, [nodes, chartData]);

  // Main Loop
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isSystemActive) {
        interval = setInterval(() => {
            const timestamp = new Date().toLocaleTimeString();
            
            // 1. Update Chart Data
            setChartData(prev => {
                const newData = [...prev, { time: timestamp, hash: totalHashrate }];
                return newData.slice(-30); // Keep last 30 points
            });

            // 2. Random Logs & Rewards
            const rand = Math.random();
            if (rand > 0.85 && totalHashrate > 0) {
                // Generate a "block" or reward event
                const reward = (totalHashrate / 1000) * 0.5; // Calc reward based on hash
                onReward(parseFloat(reward.toFixed(4)));
                setLogs(prev => [...prev, `[${timestamp}] 🟩 BLOCK FOUND: +${reward.toFixed(2)} BDC`].slice(-8));
            } else if (rand > 0.6) {
                setLogs(prev => [...prev, `[${timestamp}] Validating blocks from ${nodes.filter(n => n.status === 'online').length} sources...`].slice(-8));
            }

        }, 1000);
    }

    return () => clearInterval(interval);
  }, [isSystemActive, totalHashrate, onReward, nodes]);

  const toggleNode = (id: string) => {
    setNodes(prev => prev.map(node => {
        if (node.id === id) {
            const newStatus = node.status === 'online' ? 'offline' : 'online';
            return { ...node, status: newStatus };
        }
        return node;
    }));
  };

  const connectAll = () => {
    setLogs(prev => [...prev, ">> INITIATING GLOBAL HANDSHAKE...", ">> CONNECTING ALL API ENDPOINTS..."]);
    setNodes(prev => prev.map(node => ({ ...node, status: 'optimizing' })));
    
    setTimeout(() => {
        setNodes(prev => prev.map(node => ({ ...node, status: 'online' })));
        setLogs(prev => [...prev, ">> ALL SYSTEMS ONLINE.", ">> MAX HASHRATE ACHIEVED."]);
    }, 1500);
  };

  const getIcon = (type: string) => {
    switch(type) {
        case 'streaming': return <Music size={16} />;
        case 'hardware': return <Server size={16} />;
        case 'commerce': return <ShoppingBag size={16} />;
        case 'defi': return <Coins size={16} />;
        case 'metaverse': return <Box size={16} />;
        default: return <Activity size={16} />;
    }
  };

  return (
    <div className="animate-fade-in pb-24">
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
                <Globe size={20} className="text-emerald-500" />
                Network Command
            </h2>
            <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${totalHashrate > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></span>
                <p className="text-[10px] text-neutral-500 font-mono uppercase">
                    GLOBAL HASH: {(totalHashrate / 1000).toFixed(2)} GH/s
                </p>
            </div>
            </div>
        </div>
        <button 
            onClick={() => setIsSystemActive(!isSystemActive)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border ${isSystemActive ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50' : 'bg-neutral-800 text-neutral-500 border-neutral-700'}`}
        >
            <Power size={18} />
        </button>
      </div>

      {/* Main Graph Card */}
      <div className="glass-panel p-6 rounded-3xl mb-6 border border-emerald-500/30 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full mix-blend-overlay filter blur-[100px] opacity-20 -mr-16 -mt-16 animate-pulse"></div>
        
        <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
                <div>
                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider mb-1">Total Network Output</p>
                    <h1 className="text-4xl font-mono font-bold text-white tracking-tighter">
                        {Math.floor(totalHashrate).toLocaleString()} 
                        <span className="text-sm text-neutral-500 font-sans ml-2">H/s</span>
                    </h1>
                </div>
                <div className="text-right">
                    <p className="text-[10px] text-neutral-400">Projected Yield (24h)</p>
                    <p className="text-xl font-bold text-gold-500">
                        +{(totalHashrate * 0.024).toFixed(1)} <span className="text-xs">BDCC</span>
                    </p>
                </div>
            </div>

            <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorHash" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <YAxis hide domain={['auto', 'auto']} />
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                            itemStyle={{ color: '#10b981', fontFamily: 'monospace' }}
                            labelStyle={{ display: 'none' }}
                            formatter={(value: number) => [`${value.toFixed(0)} H/s`, 'Hashrate']}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="hash" 
                            stroke="#10b981" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorHash)" 
                            isAnimationActive={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
      </div>

      {/* Connection Hub */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Digital Empire Uplink</h3>
            <button 
                onClick={connectAll}
                className="text-[10px] bg-gold-500 text-black px-3 py-1.5 rounded-full font-bold hover:bg-gold-400 transition-colors flex items-center gap-1"
            >
                <Zap size={10} fill="currentColor" />
                CONNECT ALL
            </button>
        </div>

        <div className="space-y-3">
            {nodes.map(node => (
                <div 
                    key={node.id}
                    onClick={() => toggleNode(node.id)}
                    className={`glass-panel p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        node.status === 'online' 
                            ? 'border-emerald-500/30 bg-emerald-950/10' 
                            : node.status === 'optimizing'
                            ? 'border-gold-500/30 bg-gold-950/10'
                            : 'border-white/5 hover:border-white/10'
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                             node.status === 'online' ? 'bg-emerald-500/20 text-emerald-400' : 
                             node.status === 'optimizing' ? 'bg-gold-500/20 text-gold-400' : 'bg-neutral-800 text-neutral-600'
                        }`}>
                            {getIcon(node.type)}
                        </div>
                        <div>
                            <h4 className={`font-bold text-sm ${node.status === 'offline' ? 'text-neutral-500' : 'text-white'}`}>{node.name}</h4>
                            <p className="text-[10px] text-neutral-500 uppercase flex items-center gap-1">
                                {node.type} Protocol
                                {node.status === 'online' && <span className="text-emerald-500">• Contributing {node.hashrate} H/s</span>}
                            </p>
                        </div>
                    </div>
                    
                    <div className={`w-3 h-3 rounded-full ${
                        node.status === 'online' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 
                        node.status === 'optimizing' ? 'bg-gold-500 animate-ping' : 'bg-neutral-800'
                    }`}></div>
                </div>
            ))}
        </div>
      </div>

      {/* Terminal */}
      <div className="glass-panel p-0 rounded-2xl overflow-hidden mb-6 border border-emerald-500/20 bg-black">
        <div className="bg-neutral-900/50 p-2 flex items-center justify-between border-b border-white/5">
            <span className="text-[10px] font-mono text-emerald-500 uppercase">SYSTEM_LOG // ROOT_ACCESS</span>
            <Activity size={12} className={`text-emerald-500 ${isSystemActive ? 'animate-pulse' : ''}`} />
        </div>
        <div className="p-4 h-32 overflow-hidden relative font-mono text-[10px] space-y-1">
            <div className="absolute inset-0 bg-[url('https://media.giphy.com/media/oEnTTI3xlB66Y/giphy.gif')] opacity-5 pointer-events-none"></div>
            {logs.length === 0 && <span className="text-neutral-600">Initializing BDC Mainnet Connection...</span>}
            {logs.map((log, i) => (
                <div key={i} className={`${log.includes('BLOCK') ? 'text-emerald-400 font-bold' : log.includes('>>') ? 'text-gold-500' : 'text-neutral-500'}`}>
                    {log}
                </div>
            ))}
            <div ref={logEndRef} />
        </div>
      </div>

    </div>
  );
};
