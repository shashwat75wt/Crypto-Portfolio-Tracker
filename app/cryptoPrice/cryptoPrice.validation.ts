import { Request, Response, NextFunction } from "express";

/**
 * Validate crypto price query parameters.
 */
export const validateCryptoPriceQuery = (req: Request, res: Response, next: NextFunction) => {
  const { symbol } = req.query;

  if (!symbol || typeof symbol !== "string") {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing 'symbol' parameter.",
    });
  }

  next();
};
