import mongoose from "mongoose";

export interface IPriceAlert {
  userId: mongoose.Types.ObjectId;
  symbol: string;
  targetPrice: number;
  direction: "above" | "below";
  status?: "pending" | "triggered";
}
