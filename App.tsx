
import React, { useState } from 'react';
import { Home, Wallet, Bot, Settings, CreditCard, Crown } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { ContactlessPay } from './components/ContactlessPay';
import { PaymentMethods } from './components/PaymentMethods';
import { OnlineBanking } from './components/OnlineBanking';
import { NFTGallery } from './components/NFTGallery';
import { NFTDetail } from './components/NFTDetail';
import { GeminiAdvisor } from './components/GeminiAdvisor';
import { MiningMonitor } from './components/MiningMonitor';
import { TradingBot } from './components/TradingBot';
import { Transaction, NFT, AppView } from './types';

// BDC Cartel Real Data
const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: '1', type: 'payment', amount: -240.50, currency: 'USD', merchant: 'Cartel Merch Store', date: 'Today, 10:23 AM', status: 'completed' },
  { id: '2', type: 'mining_reward', amount: 450.00, currency: 'BDCC', merchant: 'Node Reward #8842', date: 'Today, 09:00 AM', status: 'completed' },
  { id: '3', type: 'receive', amount: 50000.00, currency: 'USD', merchant: 'Music Royalty Payout', date: 'Yesterday, 4:15 PM', status: 'completed' },
  { id: '4', type: 'nft_purchase', amount: -2500.00, currency: 'BDCC', merchant: 'BDC Genesis Mint', date: 'Oct 24', status: 'completed' },
  { id: '5', type: 'payment', amount: -45.00, currency: 'USD', merchant: 'Niš City Transport', date: 'Pending', status: 'pending' },
  { id: '6', type: 'trade_profit', amount: 12500.00, currency: 'USD', merchant: 'AI Arbitrage Bot', date: 'Oct 20', status: 'completed' },
  { id: '7', type: 'receive', amount: 938000.00, currency: 'USD', merchant: 'Vault Deposit', date: 'Oct 01', status: 'completed' }
];

const MOCK_NFTS: NFT[] = [
  { 
    id: '1', 
    name: 'Cartel Boss #001', 
    collection: 'BDC Origins', 
    imageUrl: 'https://picsum.photos/400/400?random=101', 
    value: 15.5, 
    change24h: 12.5 
  },
  { 
    id: '2', 
    name: 'Encrypted Mask', 
    collection: 'BDC Gear', 
    imageUrl: 'https://picsum.photos/400/400?random=102', 
    value: 4.2, 
    change24h: 2.1 
  },
  { 
    id: '3', 
    name: 'Safehouse Key', 
    collection: 'Cartel Property', 
    imageUrl: 'https://picsum.photos/400/400?random=103', 
    value: 8.8, 
    change24h: -0.5 
  }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.DASHBOARD);
  const [balance, setBalance] = useState(1000000.00); 
  const [bdcBalance, setBdcBalance] = useState(5240321.00); // BDCC Balance
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [nfts, setNfts] = useState<NFT[]>(MOCK_NFTS);
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
    const newTx: Transaction = {
        id: Date.now().toString(),
        type: 'mint_fee',
        amount: -cost,
        currency: 'BDCC',
        merchant: 'BDC Smart Contract',
        date: 'Just now',
        status: 'completed'
    };
    setTransactions(prev => [newTx, ...prev]);
    
    // Add new NFT
    const mintedNFT: NFT = {
        id: Date.now().toString(),
        name: `Cartel Soldier #${Math.floor(Math.random() * 9000) + 1000}`,
        collection: 'BDC Gen-2',
        imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
        value: cost / 1000, // Arbitrary value logic
        change24h: 0
    };
    setNfts(prev => [mintedNFT, ...prev]);
  };

  const handleNftClick = (nft: NFT) => {
    setSelectedNft(nft);
    setView(AppView.NFT_DETAIL);
  };

  return (
    <div className="min-h-screen bg-black text-slate-50 relative overflow-hidden font-poppins">
      {/* Background Ambient Effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-gold-500/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-emerald-900/10 rounded-full blur-[150px]"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen pb-24 shadow-2xl bg-black/80 border-x border-white/5">
        
        {/* Header */}
        <header className="p-6 flex justify-between items-center bg-black/90 backdrop-blur-md sticky top-0 z-40 border-b border-gold-500/20">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-tr from-gold-500 to-amber-200 rounded-lg flex items-center justify-center shadow-lg shadow-gold-500/20">
              <Crown size={20} className="text-black" />
            </div>
            <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-gradient-gold leading-none">BDC Vault</span>
                <span className="text-[10px] text-emerald-500 font-mono tracking-wider">MAINNET ONLINE</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center border border-gold-500/30">
             <img src="https://picsum.photos/100/100?random=99" alt="User" className="w-full h-full rounded-full opacity-90" />
          </button>
        </header>

        {/* Dynamic Content */}
        <main className="p-4">
          {view === AppView.DASHBOARD && (
            <Dashboard 
              balance={balance} 
              bdcBalance={bdcBalance}
              transactions={transactions} 
              onNavigate={setView} 
            />
          )}
          
          {/* Payment Views */}
          {view === AppView.PAY && (
            <PaymentMethods 
              onSelect={setView} 
              onBack={() => setView(AppView.DASHBOARD)} 
            />
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
              onNFTClick={handleNftClick}
              onMint={(cost) => handleMint(cost)}
              bdcBalance={bdcBalance}
            />
          )}
          {view === AppView.NFT_DETAIL && selectedNft && (
            <NFTDetail 
              nft={selectedNft} 
              onBack={() => setView(AppView.NFT)} 
            />
          )}
          {view === AppView.ADVISOR && (
            <GeminiAdvisor 
              balance={balance} 
              recentTransactions={transactions}
            />
          )}

          {/* New Wealth Views */}
          {view === AppView.MINING && (
            <MiningMonitor 
              onBack={() => setView(AppView.DASHBOARD)}
              onReward={(amount) => handleIncome(amount, 'Algo Mining Pool', 'mining_reward')}
              bdcBalance={bdcBalance}
            />
          )}
          {view === AppView.TRADING && (
            <TradingBot 
              onBack={() => setView(AppView.DASHBOARD)}
              onProfit={(amount) => handleIncome(amount, 'AI Trading Bot', 'trade_profit')}
            />
          )}
        </main>

        {/* Floating Contactless Overlay */}
        {view === AppView.PAY_NFC && (
          <ContactlessPay 
            onClose={() => setView(AppView.PAY)} 
            onPaymentComplete={(amount) => handlePaymentComplete(amount, 'BDC NFC Terminal')} 
          />
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/90 backdrop-blur-xl border-t border-white/10 pb-safe z-40">
          <div className="flex justify-around items-center p-4">
            <button 
              onClick={() => setView(AppView.DASHBOARD)}
              className={`flex flex-col items-center gap-1 transition-colors ${view === AppView.DASHBOARD ? 'text-gold-500' : 'text-neutral-500'}`}
            >
              <Home size={22} />
              <span className="text-[10px] font-medium tracking-wide">Vault</span>
            </button>

            <button 
              onClick={() => setView(AppView.NFT)}
              className={`flex flex-col items-center gap-1 transition-colors ${view === AppView.NFT || view === AppView.NFT_DETAIL ? 'text-gold-500' : 'text-neutral-500'}`}
            >
              <Wallet size={22} />
              <span className="text-[10px] font-medium tracking-wide">Assets</span>
            </button>

            {/* Pay Button - Floating */}
            <div className="relative -top-8">
              <button 
                onClick={() => setView(AppView.PAY)}
                className={`w-16 h-16 bg-gradient-to-t from-gold-600 to-gold-400 rounded-full flex items-center justify-center shadow-lg shadow-gold-500/20 border-4 border-black transition-transform active:scale-95 ${
                  [AppView.PAY, AppView.PAY_NFC, AppView.PAY_BANKING].includes(view) ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-black' : ''
                }`}
              >
                <CreditCard size={28} className="text-black" />
              </button>
            </div>

            <button 
              onClick={() => setView(AppView.ADVISOR)}
              className={`flex flex-col items-center gap-1 transition-colors ${view === AppView.ADVISOR ? 'text-gold-500' : 'text-neutral-500'}`}
            >
              <Bot size={22} />
              <span className="text-[10px] font-medium tracking-wide">Cartel AI</span>
            </button>

            <button 
              onClick={() => setView(AppView.TRADING)}
              className={`flex flex-col items-center gap-1 transition-colors ${view === AppView.TRADING || view === AppView.MINING ? 'text-gold-500' : 'text-neutral-500'}`}
            >
              <Settings size={22} />
              <span className="text-[10px] font-medium tracking-wide">Earn</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default App;
