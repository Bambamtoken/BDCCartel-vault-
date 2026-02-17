import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Crown } from 'lucide-react';
import { ChatMessage } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface GeminiAdvisorProps {
  balance: number;
  recentTransactions: any[];
}

export const GeminiAdvisor: React.FC<GeminiAdvisorProps> = ({ balance, recentTransactions }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "Consigliere online. I've analyzed the Cartel's liquidity. With 1,000,000 in reserves, how shall we expand the empire today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getFinancialAdvice(userMsg.text, balance, recentTransactions);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
        const errorMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "Encrypted channel disrupted. Please try again.",
            timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] animate-fade-in">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-2xl p-4 border ${
              msg.role === 'user' 
                ? 'bg-gold-500 text-black rounded-br-none border-gold-400' 
                : 'bg-neutral-900/80 text-slate-200 rounded-bl-none border-gold-500/20'
            }`}>
              <div className="flex items-center gap-2 mb-1 opacity-70">
                {msg.role === 'model' ? <Crown size={12} className="text-gold-500" /> : <User size={12} />}
                <span className={`text-[10px] uppercase tracking-wider font-bold ${msg.role === 'user' ? 'text-black/70' : 'text-gold-500'}`}>
                  {msg.role === 'model' ? 'Consigliere' : 'Boss'}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line font-medium">{msg.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-neutral-900/80 border border-gold-500/20 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
              <Sparkles size={16} className="text-gold-500 animate-spin" />
              <span className="text-xs text-neutral-400 animate-pulse">Strategizing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 glass-panel border-t border-white/5 mt-auto rounded-t-3xl">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Consult the strategist..."
            className="flex-1 bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors placeholder:text-neutral-600"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-gold-500 text-black p-3 rounded-xl hover:bg-gold-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gold-500/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};