import { PriceAlert } from "./priceAlert.schema";
import { IPriceAlert } from "./priceAlert.dto";

/**
 * Create a new price alert.
 * 
 * @param {IPriceAlert} data - The price alert data to be saved
 * @returns {Promise<IPriceAlert>} - The created price alert document
 */
export const createPriceAlert = async (data: IPriceAlert) => {
  return await PriceAlert.create(data);
};

/**
 * Get all active (pending) price alerts for a specific user.
 * 
 * This function retrieves only price alerts that are still pending, meaning they 
 * haven't been triggered or canceled yet.
 * 
 * @param {string} userId - The ID of the user whose active price alerts are requested
 * @returns {Promise<IPriceAlert[]>} - Array of active price alerts for the user
 */
export const getUserPriceAlerts = async (userId: string) => {
  return await PriceAlert.find({ userId, status: "pending" });
};

/**
 * Get all price alerts in the system.
 * 
 * This function is typically used for administrative purposes or system-wide 
 * monitoring to review all price alerts regardless of status.
 * 
 * @returns {Promise<IPriceAlert[]>} - Array of all price alerts in the database
 */
export const getAllPriceAlerts = async () => {
  return await PriceAlert.find();
};
