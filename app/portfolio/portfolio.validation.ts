import { body, param } from "express-validator";

export const createPortfolio = [
  body("name").notEmpty().withMessage("Name is required").isString().withMessage("Name must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
];

export const updatePortfolio = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("description").optional().isString().withMessage("Description must be a string"),
];

export const validatePortfolioId = [
  param("id").notEmpty().withMessage("Portfolio ID is required").isString().withMessage("Portfolio ID must be a string"),
];
