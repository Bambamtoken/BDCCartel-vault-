import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, AlertCircle, Loader2, Landmark } from 'lucide-react';

interface OnlineBankingProps {
  onBack: () => void;
  onPaymentComplete: (amount: number, merchant: string) => void;
  balance: number;
}

export const OnlineBanking: React.FC<OnlineBankingProps> = ({ onBack, onPaymentComplete, balance }) => {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    recipient: '',
    iban: '',
    amount: '',
    reference: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const amountNum = parseFloat(formData.amount);
    
    if (!formData.recipient || !formData.iban || !formData.amount) {
      setError("Please fill in all required fields.");
      return;
    }
    if (isNaN(amountNum) || amountNum <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (amountNum > balance) {
      setError("Insufficient funds.");
      return;
    }

    setStep('processing');
    
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onPaymentComplete(amountNum, formData.recipient);
      }, 2000);
    }, 2000);
  };

  if (step === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in text-center px-6">
        <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
          <CheckCircle2 size={48} className="text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Wire Sent</h2>
        <p className="text-neutral-400">
          Successfully transferred ${parseFloat(formData.amount).toFixed(2)} to {formData.recipient}
        </p>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] animate-fade-in text-center px-6">
        <div className="w-24 h-24 bg-gold-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse border border-gold-500/30">
          <Loader2 size={48} className="text-gold-500 animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Authorizing</h2>
        <p className="text-neutral-400">Establishing secure link...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-20">
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-white/5"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-white">Wire Transfer</h2>
      </div>

      <div className="glass-panel p-6 rounded-3xl">
        <div className="flex items-center gap-3 mb-6 p-4 bg-gold-500/5 rounded-xl border border-gold-500/20">
          <Landmark size={24} className="text-gold-500" />
          <div>
            <p className="text-xs text-gold-500 font-bold uppercase tracking-wider">Source</p>
            <p className="text-white font-semibold">BDC Main Vault ...8842</p>
          </div>
          <div className="ml-auto text-right">
             <p className="text-xs text-neutral-500">Liquidity</p>
             <p className="text-white font-bold">${balance.toLocaleString()}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Recipient</label>
            <input 
              type="text"
              value={formData.recipient}
              onChange={e => setFormData({...formData, recipient: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-neutral-700"
              placeholder="Name or Entity"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 block">IBAN / Swift</label>
            <input 
              type="text"
              value={formData.iban}
              onChange={e => setFormData({...formData, iban: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-mono placeholder:text-neutral-700"
              placeholder="US89 0000 0000 0000 0000 00"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Amount</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-500 font-bold">$</span>
              <input 
                type="number"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-8 pr-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors text-lg font-bold placeholder:text-neutral-700"
                placeholder="0.00"
                min="0.01"
                step="0.01"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider mb-2 block">Reference (Optional)</label>
            <input 
              type="text"
              value={formData.reference}
              onChange={e => setFormData({...formData, reference: e.target.value})}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-neutral-700"
              placeholder="Payment details..."
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-900/10 p-3 rounded-lg border border-rose-500/20">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gold-500 text-black py-4 rounded-xl font-bold text-lg hover:bg-gold-400 transition-all shadow-lg shadow-gold-500/25 mt-4"
          >
            Execute Transfer
          </button>
        </form>
      </div>
    </div>
  );
};