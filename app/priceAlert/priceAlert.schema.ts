import mongoose from "mongoose";

const PriceAlertSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    symbol: { type: String, required: true }, // Example: "BTCUSDT"
    targetPrice: { type: Number, required: true },
    direction: { type: String, enum: ["above", "below"], required: true }, // Alert when price goes above/below
    status: { type: String, enum: ["pending", "triggered"], default: "pending" },
  },
  { timestamps: true }
);

export const PriceAlert = mongoose.model("PriceAlert", PriceAlertSchema);
