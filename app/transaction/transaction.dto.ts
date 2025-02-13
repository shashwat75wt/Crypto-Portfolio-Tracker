import { BaseSchema } from "../common/dto/base.dto";
import mongoose from "mongoose";

export type TransactionType = "BUY" | "SELL" | "TRANSFER";

export interface ITransaction extends BaseSchema {
  user: mongoose.Types.ObjectId;  // User who made the transaction
  portfolio: mongoose.Types.ObjectId;  // Portfolio ID
  cryptoSymbol: string;  // e.g., BTC, ETH
  type: TransactionType;  // BUY / SELL / TRANSFER
  amount: number;  // Quantity of crypto
  purchasePrice: number;  // Price per unit at transaction time
  total: number;  // Total cost or proceeds (amount * price)
  transactionDate: Date;
}
