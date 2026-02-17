
export interface Transaction {
  id: string;
  type: 'payment' | 'receive' | 'nft_purchase' | 'mining_reward' | 'trade_profit' | 'mint_fee';
  amount: number;
  currency: 'USD' | 'BDCC';
  merchant?: string;
  date: string;
  status: 'completed' | 'pending';
}

export interface NFT {
  id: string;
  name: string;
  collection: string;
  imageUrl: string;
  value: number;
  change24h: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface TradePosition {
  id: string;
  pair: string;
  type: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  leverage: number;
  status: 'OPEN' | 'CLOSED';
}

export interface EmpireNode {
  id: string;
  name: string;
  type: 'streaming' | 'hardware' | 'commerce' | 'metaverse' | 'defi';
  status: 'online' | 'offline' | 'optimizing';
  hashrate: number; 
  icon?: string;
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  PAY = 'PAY',
  PAY_NFC = 'PAY_NFC',
  PAY_BANKING = 'PAY_BANKING',
  NFT = 'NFT',
  NFT_DETAIL = 'NFT_DETAIL',
  ADVISOR = 'ADVISOR',
  MINT = 'MINT',
  MINING = 'MINING',
  TRADING = 'TRADING'
}
