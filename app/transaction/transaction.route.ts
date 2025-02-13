import { Router } from "express";
import * as transactionController from "./transaction.controller";
import * as transactionValidator from "./transaction.validation";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import passport from "passport";

const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: API endpoints for managing user transactions
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Create a new transaction for the logged-in user.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               portfolioId:
 *                 type: string
 *                 example: "65c5f2c6b0f7e5a9d2a4d3b7"
 *               symbol:
 *                 type: string
 *                 example: "BTC"
 *               type:
 *                 type: string
 *                 enum: [buy, sell]
 *                 example: "buy"
 *               amount:
 *                 type: number
 *                 example: 0.5
 *               price:
 *                 type: number
 *                 example: 45000
 *     responses:
 *       201:
 *         description: Transaction created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post(
  "/",
  authenticateJWT,
  transactionValidator.createTransaction,
  catchError,
  transactionController.createTransaction
);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions of the logged-in user
 *     description: Retrieve all transactions for the authenticated user.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateJWT, transactionController.getUserTransactions);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get a specific transaction by ID
 *     description: Retrieve details of a specific transaction by its ID.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65c5f2c6b0f7e5a9d2a4d3b7"
 *     responses:
 *       200:
 *         description: Transaction retrieved successfully
 *       400:
 *         description: Invalid transaction ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.get(
  "/:id",
  authenticateJWT,
  transactionValidator.validateTransactionId,
  catchError,
  transactionController.getTransactionById
);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction by ID
 *     description: Remove a transaction from the database.
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "65c5f2c6b0f7e5a9d2a4d3b7"
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       400:
 *         description: Invalid transaction ID
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Transaction not found
 */
router.delete(
  "/:id",
  authenticateJWT,
  transactionValidator.validateTransactionId,
  catchError,
  transactionController.deleteTransaction
);

export default router;
