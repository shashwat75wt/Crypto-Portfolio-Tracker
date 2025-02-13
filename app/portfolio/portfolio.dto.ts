import mongoose from "mongoose";

export interface IPortfolio {
    userId: mongoose.Types.ObjectId;
    name: string;
    description?: string;
    assets: {
      symbol: string;       // Example: "BTC", "ETH"
      amount: number;       // Number of coins owned
      purchasePrice: number; // Price at which it was bought
    }[];
  }
  