import PortfolioSchema from "./portfolio.schema";
import { CryptoPriceHistory } from "../cryptoPrice/cryptoPriceHistory.schema";
import { IPortfolio } from "./portfolio.dto";

/**
 * Create a new portfolio
 * @param {IPortfolio} data - Portfolio data to be created
 * @returns {Promise<IPortfolio>} - The created portfolio document
 */
export const createPortfolio = async (data: IPortfolio) => {
  return await PortfolioSchema.create(data);
};

/**
 * Get all portfolios for a specific user
 * @param {string} userId - User ID to fetch portfolios
 * @returns {Promise<IPortfolio[]>} - Array of user portfolios
 */
export const getUserPortfolios = async (userId: string) => {
  return await PortfolioSchema.find({ userId });
};

/**
 * Get a specific portfolio by its ID
 * @param {string} id - Portfolio ID
 * @returns {Promise<IPortfolio | null>} - The portfolio document if found, otherwise null
 */
export const getPortfolioById = async (id: string) => {
  return await PortfolioSchema.findById(id);
};

/**
 * Update a portfolio by ID
 * @param {string} id - Portfolio ID
 * @param {Partial<IPortfolio>} data - Fields to update
 * @returns {Promise<IPortfolio | null>} - The updated portfolio document if found, otherwise null
 */
export const updatePortfolio = async (id: string, data: Partial<IPortfolio>) => {
  return await PortfolioSchema.findByIdAndUpdate(id, data, { new: true });
};

/**
 * Delete a portfolio by ID
 * @param {string} id - Portfolio ID
 * @returns {Promise<IPortfolio | null>} - The deleted portfolio document if found, otherwise null
 */
export const deletePortfolio = async (id: string) => {
  return await PortfolioSchema.findByIdAndDelete(id);
};

/**
 * Calculate Profit & Loss (P&L) for a user's portfolio
 * 
 * This function fetches the user's portfolio, retrieves real-time prices for 
 * each asset, and calculates the profit or loss in absolute value and percentage.
 * 
 * @param {string} userId - The ID of the user whose P&L needs to be calculated
 * @returns {Promise<Array<{ symbol: string, amount: number, purchasePrice: number, latestPrice: number, profitLoss: number, profitLossPercentage: string }>>} - Array of P&L data for each asset in the portfolio
 */
export const calculatePortfolioPNL = async (userId: string) => {
  // Fetch all portfolios belonging to the user
  const portfolios = await PortfolioSchema.find({ userId });

  if (!portfolios.length) {
    return []; // Return an empty array if the user has no portfolios
  }

  const pnlResults = [];

  // Loop through each portfolio
  for (const portfolio of portfolios) {
    // Loop through each asset in the portfolio
    for (const asset of portfolio.assets) {
      // Ensure the asset symbol matches the format used in CryptoPriceHistory (e.g., BTCUSDT)
      const symbol = asset.symbol.endsWith("USDT") ? asset.symbol : asset.symbol + "USDT";

      // Fetch the latest price from CryptoPriceHistory for the given symbol
      const latestPriceData = await CryptoPriceHistory.findOne({ symbol: symbol.toLowerCase() })
        .sort({ timestamp: -1 }); // Sort in descending order to get the most recent price

      if (!latestPriceData) {
        continue; // Skip the asset if no price data is available
      }

      // Extract relevant data
      const latestPrice = latestPriceData.price;
      const purchasePrice = asset.purchasePrice;
      const amount = asset.amount;

      // Calculate absolute profit/loss
      const profitLoss = (latestPrice - purchasePrice) * amount;

      // Calculate profit/loss percentage
      const profitLossPercentage = ((latestPrice - purchasePrice) / purchasePrice) * 100;

      // Push the calculated P&L data to the results array
      pnlResults.push({
        symbol: asset.symbol,
        amount,
        purchasePrice,
        latestPrice,
        profitLoss,
        profitLossPercentage: profitLossPercentage.toFixed(2) + "%", // Format as a percentage
      });
    }
  }

  return pnlResults; // Return the calculated profit/loss data for the user's portfolio
};
