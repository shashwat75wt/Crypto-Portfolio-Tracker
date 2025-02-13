import { Request, Response } from "express";
import * as portfolioService from "./portfolio.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";

/**
 * Create Portfolio
 */
export const createPortfolio = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.createPortfolio({ userId: (req as any).user._id, ...req.body });
  res.send(createResponse(result, "Portfolio created successfully"));
});

/**
 * Get User Portfolios
 */
export const getUserPortfolios = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.getUserPortfolios(req.user!._id);
  res.send(createResponse(result));
});

/**
 * Get Portfolio by ID
 */
export const getPortfolioById = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.getPortfolioById(req.params.id);
  res.send(createResponse(result));
});

/**
 * Update Portfolio
 */
export const updatePortfolio = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.updatePortfolio(req.params.id, req.body);
  res.send(createResponse(result, "Portfolio updated successfully"));
});

/**
 * Delete Portfolio
 */
export const deletePortfolio = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.deletePortfolio(req.params.id);
  res.send(createResponse(result, "Portfolio deleted successfully"));
});

/**
 * Get Profit & Loss (P&L) for Portfolio
 */
export const getPortfolioPNL = asyncHandler(async (req: Request, res: Response) => {
  const result = await portfolioService.calculatePortfolioPNL(req.user!._id);
  res.send(createResponse(result, "Profit & Loss calculated successfully"));
});
