import { Request, Response } from "express";
import * as priceAlertService from "./priceAlert.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";

/**
 * Create a price alert.
 */
export const createPriceAlert = asyncHandler(async (req: Request, res: Response) => {
  const result = await priceAlertService.createPriceAlert({ userId: (req as any).user._id, ...req.body });
  res.send(createResponse(result, "Price alert created successfully"));
});

/**
 * Get a user's price alerts.
 */
export const getUserPriceAlerts = asyncHandler(async (req: Request, res: Response) => {
  const result = await priceAlertService.getUserPriceAlerts(req.user!._id);
  res.send(createResponse(result));
});

/**
 * Get all price alerts (admin/system).
 */
export const getAllPriceAlerts = asyncHandler(async (_req: Request, res: Response) => {
  const result = await priceAlertService.getAllPriceAlerts();
  res.send(createResponse(result));
});
