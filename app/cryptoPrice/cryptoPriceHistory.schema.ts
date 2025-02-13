import mongoose from "mongoose";

const CryptoPriceHistorySchema = new mongoose.Schema(
  {
    symbol: { type: String, required: true },
    price: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const CryptoPriceHistory = mongoose.model("CryptoPriceHistory", CryptoPriceHistorySchema);
