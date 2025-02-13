import { Request, Response } from "express";
import { getCryptoPriceDetails } from "./cryptoPrice.service";

/**
 * Get real-time crypto price by symbol
 */
export const getCryptoPrice = async (req: Request, res: Response) => {
  try {
    const { symbol } = req.query;

    if (!symbol) {
      return res.status(400).json({
        success: false,
        message: "Crypto symbol is required.",
      });
    }

    const priceData = getCryptoPriceDetails(symbol.toString());

    if (priceData === null) {
      return res.status(503).json({
        success: false,
        message: "Price not available. Try again in a few seconds.",
      });
    }

    res.status(200).json({
      success: true,
      symbol,
      price: priceData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
