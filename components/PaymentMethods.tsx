import React from 'react';
import { Wifi, Landmark, ArrowLeft, CreditCard, ScanLine } from 'lucide-react';
import { AppView } from '../types';

interface PaymentMethodsProps {
  onSelect: (view: AppView) => void;
  onBack: () => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({ onSelect, onBack }) => {
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors border border-white/5"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-white">Select Method</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <button 
          onClick={() => onSelect(AppView.PAY_NFC)}
          className="group relative overflow-hidden glass-panel p-6 rounded-3xl text-left hover:bg-neutral-900/80 transition-all active:scale-[0.98] border border-white/5 hover:border-gold-500/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full filter blur-2xl -mr-8 -mt-8 group-hover:bg-gold-500/20 transition-colors"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-black transition-colors border border-gold-500/20">
              <Wifi size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">NFC Pay</h3>
              <p className="text-sm text-neutral-400">Contactless payments.</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => onSelect(AppView.PAY_BANKING)}
          className="group relative overflow-hidden glass-panel p-6 rounded-3xl text-left hover:bg-neutral-900/80 transition-all active:scale-[0.98] border border-white/5 hover:border-emerald-500/30"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-2xl -mr-8 -mt-8 group-hover:bg-emerald-500/20 transition-colors"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors border border-emerald-500/20">
              <Landmark size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Wire Transfer</h3>
              <p className="text-sm text-neutral-400">IBAN / SWIFT Banking.</p>
            </div>
          </div>
        </button>

        <button 
          className="group relative overflow-hidden glass-panel p-6 rounded-3xl text-left hover:bg-neutral-900/80 transition-all active:scale-[0.98] opacity-75 border border-white/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full filter blur-2xl -mr-8 -mt-8 group-hover:bg-purple-500/20 transition-colors"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors border border-purple-500/20">
              <ScanLine size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Scan QR Code</h3>
              <p className="text-sm text-neutral-400">Merchant QR (Coming Soon).</p>
            </div>
          </div>
        </button>

        <div className="mt-4 p-4 rounded-2xl border border-dashed border-neutral-700 flex items-center justify-center text-neutral-500 text-sm gap-2">
            <CreditCard size={16} />
            More integrations pending...
        </div>
      </div>
    </div>
  );
};