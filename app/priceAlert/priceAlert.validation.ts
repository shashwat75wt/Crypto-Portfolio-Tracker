import { body } from "express-validator";

export const createPriceAlert = [
  body("symbol").notEmpty().withMessage("Symbol is required").isString(),
  body("targetPrice").notEmpty().withMessage("Target price is required").isFloat(),
  body("direction").isIn(["above", "below"]).withMessage("Direction must be 'above' or 'below'"),
];
