import TransactionSchema from "./trasaction.schema";
import PortfolioSchema from "../portfolio/portfolio.schema";
import { ITransaction } from "./transaction.dto";
import mongoose from "mongoose";

/**
 * Create a new transaction (buy, sell).
 * 
 * This function creates a new transaction and updates the user's portfolio accordingly.
 * It ensures data consistency using MongoDB transactions.
 * 
 * @param {ITransaction} data - The transaction data containing portfolio ID, type (BUY/SELL), crypto symbol, amount, and purchase price.
 * @returns {Promise<ITransaction>} - The created transaction document.
 * @throws {Error} - If portfolio is not found or there is insufficient balance for selling.
 */
export const createTransaction = async (data: ITransaction) => {
    // Start a MongoDB session for transaction handling
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      // Create the transaction
      const transaction = await TransactionSchema.create([data], { session });
  
      // Find the portfolio linked to the transaction
      const portfolio = await PortfolioSchema.findById(data.portfolio).session(session);
      if (!portfolio) throw new Error("Portfolio not found");
  
      // Ensure the portfolio has an 'assets' array
      if (!portfolio.assets) portfolio.assets = [];
  
      // Find the asset in the portfolio (if it already exists)
      const assetIndex = portfolio.assets.findIndex(asset => asset.symbol === data.cryptoSymbol);
  
      if (data.type === "BUY") {
        if (assetIndex !== -1) {
          // If asset exists, update the amount
          portfolio.assets[assetIndex].amount += data.amount;
        } else {
          // If asset doesn't exist, add it to the portfolio
          portfolio.assets.push({
            symbol: data.cryptoSymbol,
            amount: data.amount,
            purchasePrice: data.purchasePrice, // Assuming purchase price is stored per asset
          });
        }
      } else if (data.type === "SELL") {
        if (assetIndex === -1 || portfolio.assets[assetIndex].amount < data.amount) {
          throw new Error("Not enough balance to sell");
        }

        // Deduct the amount from the asset
        portfolio.assets[assetIndex].amount -= data.amount;
  
        // If the asset amount reaches zero, remove it from the portfolio
        if (portfolio.assets[assetIndex].amount === 0) {
          portfolio.assets.splice(assetIndex, 1);
        }
      }
  
      // Save the updated portfolio with the transaction session
      await portfolio.save({ session });
  
      // Commit the transaction to finalize changes
      await session.commitTransaction();
      session.endSession();
  
      return transaction[0]; // Since create() returns an array when using transactions
    } catch (error) {
      // Abort transaction in case of any error
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
};

/**
 * Get all transactions for a specific user.
 * 
 * @param {string} userId - The ID of the user whose transactions are requested.
 * @returns {Promise<ITransaction[]>} - Array of transactions sorted by date (latest first).
 */
export const getUserTransactions = async (userId: string) => {
  return await TransactionSchema.find({ user: userId }).sort({ transactionDate: -1 }).lean();
};

/**
 * Get a specific transaction by its ID.
 * 
 * @param {string} transactionId - The ID of the transaction to retrieve.
 * @returns {Promise<ITransaction | null>} - The transaction document if found, otherwise null.
 */
export const getTransactionById = async (transactionId: string) => {
  return await TransactionSchema.findById(transactionId).lean();
};

/**
 * Delete a transaction by its ID.
 * 
 * Note: Deleting a transaction does NOT automatically adjust the portfolio balances.
 * 
 * @param {string} transactionId - The ID of the transaction to delete.
 * @returns {Promise<ITransaction | null>} - The deleted transaction document if found, otherwise null.
 */
export const deleteTransaction = async (transactionId: string) => {
  return await TransactionSchema.findByIdAndDelete(transactionId);
};
