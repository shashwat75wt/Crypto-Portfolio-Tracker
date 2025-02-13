import mongoose, { Schema } from "mongoose";
import { ITransaction } from "./transaction.dto";

const TransactionSchema = new Schema<ITransaction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio", required: true },
    cryptoSymbol: { type: String, required: true },
    type: { type: String, enum: ["BUY", "SELL", "TRANSFER"], required: true },
    amount: { type: Number, required: true, min: 0 },
    purchasePrice: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 0 },
    transactionDate: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model<ITransaction>("Transaction", TransactionSchema);
