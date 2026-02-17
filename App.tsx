
import React, { useState } from 'react';
import { Home, Wallet, Bot, Settings, CreditCard, Crown, PlayCircle, Rocket } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ContactlessPay } from './components/ContactlessPay';
import { PaymentMethods } from './components/PaymentMethods';
import { OnlineBanking } from './components/OnlineBanking';
import { NFTGallery } from './components/NFTGallery';
import { NFTDetail } from './components/NFTDetail';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { MiningMonitor } from './components/MiningMonitor';
import { TradingBot } from './components/TradingBot';
import { VideoGenerator } from './components/VideoGenerator';
import { LaunchView } from './components/LaunchView';
import { Transaction, NFT, AppView, VideoAsset } from './types';

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'payment', amount: -240.50, currency: 'USD', merchant: 'Cartel Merch Store', date: 'Today, 10:23 AM', status: 'completed' },
  { id: '2', type: 'mining_reward', amount: 450.00, currency: 'BDCC', merchant: 'Node Reward #8842', date: 'Today, 09:00 AM', status: 'completed' },
  { id: '3', type: 'receive', amount: 50000.00, currency: 'USD', merchant: 'Music Royalty Payout', date: 'Yesterday, 4:15 PM', status: 'completed' },
  { id: '4', type: 'nft_purchase', amount: -2500.00, currency: 'BDCC', merchant: 'BDC Genesis Mint', date: 'Oct 24', status: 'completed' },
  { id: '5', type: 'payment', amount: -45.00, currency: 'USD', merchant: 'Niš City Transport', date: 'Pending', status: 'pending' },
  { id: '6', type: 'trade_profit', amount: 12500.00, currency: 'USD', merchant: 'AI Arbitrage Bot', date: 'Oct 20', status: 'completed' }
];

const MOCK_NFTS: NFT[] = [
  { id: '1', name: 'Cartel Boss #001', collection: 'BDC Origins', imageUrl: 'https://picsum.photos/400/400?random=101', value: 15.5, change24h: 12.5 },
  { id: '2', name: 'Encrypted Mask', collection: 'BDC Gear', imageUrl: 'https://picsum.photos/400/400?random=102', value: 4.2, change24h: 2.1 },
  { id: '3', name: 'Safehouse Key', collection: 'Cartel Property', imageUrl: 'https://picsum.photos/400/400?random=103', value: 8.8, change24h: -0.5 }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LAUNCH);
  const [balance, setBalance] = useState(1000000.00); 
  const [bdcBalance, setBdcBalance] = useState(5240321.00);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [nfts, setNfts] = useState<NFT[]>(MOCK_NFTS);
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

  const handlePaymentComplete = (amount: number, merchant: string = 'BDC Terminal') => {
    setBalance(prev => prev - amount);
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: 'payment',
      amount: -amount,
      currency: 'USD',
      merchant: merchant,
      date: 'Just now',
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    setView(AppView.DASHBOARD);
  };

  const handleIncome = (amount: number, source: string, type: 'mining_reward' | 'trade_profit') => {
    if (type === 'mining_reward') {
      setBdcBalance(prev => prev + amount);
    } else {
      setBalance(prev => prev + amount);
    }
    
    const newTx: Transaction = {
      id: Date.now().toString(),
      type: type,
      amount: amount,
      currency: type === 'mining_reward' ? 'BDCC' : 'USD',
      merchant: source,
      date: 'Just now',
      status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleMint = (cost: number) => {
    if (bdcBalance < cost) return;
    setBdcBalance(prev => prev - cost);
    setTransactions(prev => [{
        id: Date.now().toString(),
        type: 'mint_fee',
        amount: -cost,
        currency: 'BDCC',
        merchant: 'BDC Smart Contract',
        date: 'Just now',
        status: 'completed'
    }, ...prev]);
    
    const mintedNFT: NFT = {
        id: Date.now().toString(),
        name: `Cartel Soldier #${Math.floor(Math.random() * 9000) + 1000}`,
        collection: 'BDC Gen-2',
        imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
        value: cost / 1000,
        change24h: 0
    };
    setNfts(prev => [mintedNFT, ...prev]);
  };

  const addVideo = (asset: VideoAsset) => {
    setVideos(prev => [asset, ...prev]);
    const fee = 1000;
    setBdcBalance(prev => prev - fee);
    setTransactions(prev => [{
      id: Date.now().toString(),
      type: 'compute_fee',
      amount: -fee,
      currency: 'BDCC',
      merchant: 'Neural Processor Fee',
      date: 'Just now',
      status: 'completed'
    }, ...prev]);
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 relative overflow-hidden font-poppins">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-gold-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[150px]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto min-h-screen pb-24 shadow-2xl bg-black/80 border-x border-emerald-500/10">
        {view !== AppView.LAUNCH && (
          <header className="p-6 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-40 border-b border-emerald-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-emerald-400 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
                <Crown size={22} className="text-black" />
              </div>
              <div className="flex flex-col">
                  <span className="font-bold text-lg tracking-tight text-white leading-none">BDCCartel <span className="text-emerald-500">Vault</span></span>
                  <span className="text-[10px] text-emerald-500/70 font-mono tracking-widest mt-0.5">BDCHAIN_NETWORK_v3.1</span>
              </div>
            </div>
            <button 
              onClick={() => setView(AppView.LAUNCH)}
              className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-emerald-500/30 overflow-hidden"
            >
               <img src="https://picsum.photos/100/100?random=99" alt="User" className="w-full h-full object-cover opacity-90" />
            </button>
          </header>
        )}

        <main className={`${view === AppView.LAUNCH ? '' : 'p-4'}`}>
          {view === AppView.LAUNCH && (
            <LaunchView onEnter={() => setView(AppView.DASHBOARD)} />
          )}

          {view === AppView.DASHBOARD && (
            <Dashboard 
              balance={balance} 
              bdcBalance={bdcBalance}
              transactions={transactions} 
              onNavigate={setView} 
            />
          )}
          
          {view === AppView.PAY && (
            <PaymentMethods onSelect={setView} onBack={() => setView(AppView.DASHBOARD)} />
          )}
          {view === AppView.PAY_BANKING && (
             <OnlineBanking 
               onBack={() => setView(AppView.PAY)}
               onPaymentComplete={(amount, merchant) => handlePaymentComplete(amount, merchant)}
               balance={balance}
             />
          )}

          {view === AppView.NFT && (
            <NFTGallery 
              nfts={nfts} 
              onNFTClick={(nft) => { setSelectedNft(nft); setView(AppView.NFT_DETAIL); }}
              onMint={handleMint}
              bdcBalance={bdcBalance}
            />
          )}
          {view === AppView.NFT_DETAIL && selectedNft && (
            <NFTDetail nft={selectedNft} onBack={() => setView(AppView.NFT)} />
          )}
          {view === AppView.ADVISOR && (
            <GeminiAdvisor balance={balance} recentTransactions={transactions} />
          )}

          {view === AppView.MINING && (
            <MiningMonitor onBack={() => setView(AppView.DASHBOARD)} onReward={(amount) => handleIncome(amount, 'Algo Mining Pool', 'mining_reward')} bdcBalance={bdcBalance} />
          )}
          {view === AppView.TRADING && (
            <TradingBot onBack={() => setView(AppView.DASHBOARD)} onProfit={(amount) => handleIncome(amount, 'AI Trading Bot', 'trade_profit')} />
          )}
          {view === AppView.VIDEO_GEN && (
            <VideoGenerator onBack={() => setView(AppView.DASHBOARD)} onVideoGenerated={addVideo} videos={videos} />
          )}
        </main>

        {view === AppView.PAY_NFC && (
          <ContactlessPay onClose={() => setView(AppView.PAY)} onPaymentComplete={(amount) => handlePaymentComplete(amount, 'BDC NFC Terminal')} />
        )}

        {view !== AppView.LAUNCH && (
          <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/95 backdrop-blur-2xl border-t border-emerald-500/20 pb-safe z-40">
            <div className="flex justify-around items-center p-4">
              <button onClick={() => setView(AppView.DASHBOARD)} className={`flex flex-col items-center gap-1 transition-all ${view === AppView.DASHBOARD ? 'text-emerald-500 scale-110' : 'text-neutral-600'}`}>
                <Home size={22} />
                <span className="text-[10px] font-bold tracking-tighter uppercase">Home</span>
              </button>

              <button onClick={() => setView(AppView.NFT)} className={`flex flex-col items-center gap-1 transition-all ${view === AppView.NFT || view === AppView.NFT_DETAIL ? 'text-emerald-500 scale-110' : 'text-neutral-600'}`}>
                <Wallet size={22} />
                <span className="text-[10px] font-bold tracking-tighter uppercase">Assets</span>
              </button>

              <div className="relative -top-10">
                <button 
                  onClick={() => setView(AppView.VIDEO_GEN)}
                  className={`w-18 h-18 bg-gradient-to-t from-emerald-600 to-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)] border-4 border-black transition-all hover:scale-105 active:scale-95 ${
                    view === AppView.VIDEO_GEN ? 'ring-2 ring-emerald-500 ring-offset-4 ring-offset-black' : ''
                  }`}
                >
                  <PlayCircle size={32} className="text-black" />
                </button>
              </div>

              <button onClick={() => setView(AppView.ADVISOR)} className={`flex flex-col items-center gap-1 transition-all ${view === AppView.ADVISOR ? 'text-emerald-500 scale-110' : 'text-neutral-600'}`}>
                <Bot size={22} />
                <span className="text-[10px] font-bold tracking-tighter uppercase">Neural</span>
              </button>

              <button onClick={() => setView(AppView.MINING)} className={`flex flex-col items-center gap-1 transition-all ${view === AppView.MINING ? 'text-emerald-500 scale-110' : 'text-neutral-600'}`}>
                <Settings size={22} />
                <span className="text-[10px] font-bold tracking-tighter uppercase">Node</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </div>
  );
};

export default App;
