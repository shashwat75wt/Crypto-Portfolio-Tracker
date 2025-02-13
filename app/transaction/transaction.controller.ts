import { Request, Response } from "express";
import * as transactionService from "./transaction.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";

/**
 * Create a new transaction (buy, sell, transfer)
 */
export const createTransaction = asyncHandler(async (req: Request, res: Response) => {
  const result = await transactionService.createTransaction({ ...req.body, user: req.user?._id });
  res.send(createResponse(result, "Transaction created successfully"));
});

/**
 * Get all transactions for the logged-in user
 */
export const getUserTransactions = asyncHandler(async (req: Request, res: Response) => {
    const result = await transactionService.getUserTransactions(req.user!._id);
  res.send(createResponse(result, "Transactions fetched successfully"));
});

/**
 * Get a specific transaction by ID
 */
export const getTransactionById = asyncHandler(async (req: Request, res: Response) => {
  const result = await transactionService.getTransactionById(req.params.id);
  res.send(createResponse(result, "Transaction fetched successfully"));
});

/**
 * Delete a transaction by ID
 */
export const deleteTransaction = asyncHandler(async (req: Request, res: Response) => {
  await transactionService.deleteTransaction(req.params.id);
  res.send(createResponse({}, "Transaction deleted successfully"));
});
