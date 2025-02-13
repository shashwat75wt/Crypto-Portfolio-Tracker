import { body, param } from "express-validator";

/**
 * Validation for creating a transaction
 */
export const createTransaction = [
  body("type")
    .isIn(["BUY", "SELL", "TRANSFER"])
    .withMessage("Transaction type must be either BUY, SELL, or TRANSFER"),
  body("cryptoSymbol")
    .notEmpty()
    .withMessage("Crypto symbol is required")
    .isString()
    .withMessage("Crypto symbol must be a string"),
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Amount must be a positive number"),
  body("purchasePrice")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("date")
    .optional()
    .isISO8601()
    .withMessage("Date must be a valid ISO 8601 format"),
  body("notes")
    .optional()
    .isString()
    .withMessage("Notes must be a string"),
];

/**
 * Validation for transaction ID in params
 */
export const validateTransactionId = [
  param("id")
    .notEmpty()
    .withMessage("Transaction ID is required")
    .isMongoId()
    .withMessage("Invalid transaction ID format"),
];
