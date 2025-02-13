export interface CryptoPriceDTO {
    symbol: string;
    price: number;
    currency?: string;
    marketCap?: number;
    volume?: number;
    change24h?: number;
  }
  