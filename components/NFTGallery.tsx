
import React, { useState, useMemo } from 'react';
import { NFT } from '../types';
import { TrendingUp, ArrowUpDown, Filter, Plus, Zap } from 'lucide-react';

interface NFTGalleryProps {
  nfts: NFT[];
  onNFTClick: (nft: NFT) => void;
  onMint: (cost: number) => void;
  bdcBalance: number;
}

type SortOption = 'value_desc' | 'value_asc' | 'change_desc' | 'change_asc';

export const NFTGallery: React.FC<NFTGalleryProps> = ({ nfts, onNFTClick, onMint, bdcBalance }) => {
  const [sortOption, setSortOption] = useState<SortOption>('value_desc');
  const [isMinting, setIsMinting] = useState(false);
  
  const MINT_COST = 5000; // BDCC

  const sortedNFTs = useMemo(() => {
    const sorted = [...nfts];
    switch (sortOption) {
      case 'value_desc':
        return sorted.sort((a, b) => b.value - a.value);
      case 'value_asc':
        return sorted.sort((a, b) => a.value - b.value);
      case 'change_desc':
        return sorted.sort((a, b) => b.change24h - a.change24h);
      case 'change_asc':
        return sorted.sort((a, b) => a.change24h - b.change24h);
      default:
        return sorted;
    }
  }, [nfts, sortOption]);

  const handleMintClick = () => {
    setIsMinting(true);
    setTimeout(() => {
        onMint(MINT_COST);
        setIsMinting(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      {/* Minting Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-neutral-900 border border-emerald-500/30 p-6">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/600/300?grayscale&blur=2')] opacity-20 bg-cover bg-center"></div>
        <div className="relative z-10 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30 mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live Drop</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">BDC Gen-2 Access</h2>
            <p className="text-sm text-neutral-400 mb-4 max-w-[200px]">Mint official cartel membership assets on-chain.</p>
            
            <div className="flex items-center gap-4 w-full">
                <button 
                    onClick={handleMintClick}
                    disabled={isMinting || bdcBalance < MINT_COST}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                    {isMinting ? (
                        <Zap size={18} className="animate-spin" />
                    ) : (
                        <Plus size={18} />
                    )}
                    {isMinting ? 'Minting...' : `Mint (${MINT_COST} BDCC)`}
                </button>
            </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
            Your Collection
            <span className="bg-neutral-800 text-neutral-400 text-xs px-2 py-0.5 rounded-full">{nfts.length}</span>
        </h2>
        
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            className="appearance-none bg-neutral-900 text-gold-500 text-xs font-medium py-2 pl-3 pr-8 rounded-lg border border-neutral-800 focus:outline-none focus:border-gold-500 cursor-pointer hover:bg-neutral-800 transition-colors"
          >
            <option value="value_desc">Value: High</option>
            <option value="value_asc">Value: Low</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-gold-500">
            <Filter size={12} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {sortedNFTs.map((nft) => (
          <div 
            key={nft.id} 
            onClick={() => onNFTClick(nft)}
            className="glass-panel p-3 rounded-2xl group hover:bg-neutral-900/80 transition-all cursor-pointer border border-white/5 hover:border-gold-500/30"
          >
            <div className="aspect-square w-full rounded-xl overflow-hidden mb-3 relative">
              <img 
                src={nft.imageUrl} 
                alt={nft.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold text-gold-500 border border-gold-500/20 uppercase tracking-wide">
                {nft.collection.split(' ')[1]}
              </div>
            </div>
            
            <div className="flex justify-between items-start">
              <div className="overflow-hidden">
                <h3 className="font-bold text-white text-sm truncate">{nft.name}</h3>
                <div className={`flex items-center gap-1 text-[10px] mt-1 ${nft.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  <TrendingUp size={10} className={nft.change24h < 0 ? 'rotate-180' : ''} />
                  <span>{nft.change24h >= 0 ? '+' : ''}{nft.change24h}%</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
