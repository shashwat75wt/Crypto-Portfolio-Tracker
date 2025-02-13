import mongoose from "mongoose";
import { IPortfolio } from "./portfolio.dto";

const Schema = mongoose.Schema;

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String },
    assets: [
      {
        symbol: { type: String, required: true },
        amount: { type: Number, required: true },
        purchasePrice: { type: Number, required: true },
        
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);
