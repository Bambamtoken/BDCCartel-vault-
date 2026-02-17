import React, { useEffect, useState } from 'react';
import { Wifi, CheckCircle2, ShieldAlert, Lock, Fingerprint } from 'lucide-react';

interface ContactlessPayProps {
  onClose: () => void;
  onPaymentComplete: (amount: number) => void;
}

export const ContactlessPay: React.FC<ContactlessPayProps> = ({ onClose, onPaymentComplete }) => {
  const [status, setStatus] = useState<'scanning' | 'confirm' | 'processing' | 'success' | 'failed'>('scanning');
  const [amount, setAmount] = useState<number>(0);

  useEffect(() => {
    if (status === 'scanning') {
      // Simulate finding a terminal randomly between 2-3 seconds
      const scanTimer = setTimeout(() => {
        const randomAmount = Math.floor(Math.random() * 200) + 15; // Random payment amount
        setAmount(randomAmount);
        setStatus('confirm');
      }, 2500);

      return () => clearTimeout(scanTimer);
    }
  }, [status]);

  const handleConfirm = () => {
    setStatus('processing');
    // Simulate transaction processing
    setTimeout(() => {
      setStatus('success');
      
      // Close after success
      setTimeout(() => {
        onPaymentComplete(amount);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in">
      <div className="w-full max-w-md p-8 flex flex-col items-center">
        
        {/* Status Icon Container */}
        <div className="mb-8 relative">
          {status === 'scanning' && (
            <>
              <div className="w-48 h-48 rounded-full border-4 border-gold-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 nfc-pulse"></div>
              <div className="w-48 h-48 rounded-full border-4 border-gold-500/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 nfc-pulse" style={{ animationDelay: '0.5s' }}></div>
            </>
          )}
          
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 border-4 ${
            status === 'success' ? 'bg-emerald-600 border-emerald-400' :
            status === 'confirm' ? 'bg-neutral-900 border-rose-500 shadow-[0_0_30px_rgba(244,63,94,0.3)]' :
            status === 'processing' ? 'bg-gold-500 animate-pulse border-white' :
            'bg-neutral-900 border-gold-500'
          }`}>
            {status === 'success' ? (
              <CheckCircle2 size={64} className="text-white animate-bounce" />
            ) : status === 'confirm' ? (
              <Lock size={56} className="text-rose-500" />
            ) : (
              <Wifi size={64} className={`text-white ${status === 'scanning' ? 'animate-pulse' : ''}`} />
            )}
          </div>
        </div>

        {/* Text Status */}
        <h2 className={`text-2xl font-bold mb-2 text-center tracking-tight ${status === 'confirm' ? 'text-rose-500' : 'text-white'}`}>
          {status === 'scanning' && "Hold Near Terminal"}
          {status === 'confirm' && "Security Intercept"}
          {status === 'processing' && "Authenticating..."}
          {status === 'success' && "Transfer Complete"}
        </h2>
        
        {/* Subtext / Details */}
        <div className="text-center mb-8 w-full">
          {status === 'scanning' && (
            <p className="text-neutral-400">Searching for BDC-compatible reader...</p>
          )}

          {status === 'confirm' && (
            <div className="bg-neutral-900/80 border border-white/10 rounded-2xl p-6 mt-4 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-4 text-rose-400">
                <ShieldAlert size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">Verification Required</span>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Merchant</span>
                  <span className="text-white font-medium">BDC NFC Terminal</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500">Amount</span>
                  <span className="text-2xl font-bold text-white">${amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                 <button 
                  onClick={onClose}
                  className="py-3 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-sm hover:bg-neutral-700 transition-colors"
                >
                  Decline
                </button>
                <button 
                  onClick={handleConfirm}
                  className="py-3 rounded-xl bg-gold-500 text-black font-bold text-sm hover:bg-gold-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20"
                >
                  <Fingerprint size={16} />
                  Authorize
                </button>
              </div>
            </div>
          )}

          {status === 'processing' && (
            <p className="text-neutral-400">Verifying cryptographic signature...</p>
          )}
          {status === 'success' && (
            <p className="text-neutral-400">Debited ${amount}.00 from Vault.</p>
          )}
        </div>

        {status === 'scanning' && (
          <button 
            onClick={onClose}
            className="px-8 py-3 rounded-full border border-neutral-700 text-neutral-300 hover:bg-neutral-800 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};
