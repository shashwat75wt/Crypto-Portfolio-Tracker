import { Router } from "express";
import { catchError } from "../common/middleware/catch-validation-error.middleware";
import * as portfolioController from "./portfolio.controller";
import * as portfolioValidator from "./portfolio.validation";
import passport from "passport";

const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

/**
 * @swagger
 * tags:
 *   name: Portfolio
 *   description: API endpoints for managing user portfolios
 */

/**
 * @swagger
 * /portfolio:
 *   post:
 *     summary: Create a new portfolio
 *     description: Allows an authenticated user to create a portfolio with a list of crypto assets.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "My Crypto Portfolio"
 *               description:
 *                 type: string
 *                 example: "Long-term investments"
 *               assets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     symbol:
 *                       type: string
 *                       example: "BTC"
 *                     amount:
 *                       type: number
 *                       example: 1.5
 *                     purchasePrice:
 *                       type: number
 *                       example: 45000
 *     responses:
 *       201:
 *         description: Portfolio created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateJWT, portfolioValidator.createPortfolio, catchError, portfolioController.createPortfolio);

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get all portfolios of the logged-in user
 *     description: Fetches all portfolios created by the authenticated user.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of portfolios retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateJWT, portfolioController.getUserPortfolios);

/**
 * @swagger
 * /portfolio/pnl:
 *   get:
 *     summary: Get profit and loss (PnL) for user's portfolios
 *     description: Calculates the profit/loss for each asset in the user's portfolio based on real-time prices.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profit and loss calculated successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/pnl", authenticateJWT, portfolioController.getPortfolioPNL);

/**
 * @swagger
 * /portfolio/{id}:
 *   get:
 *     summary: Get portfolio by ID
 *     description: Retrieves a specific portfolio by its ID.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio ID
 *     responses:
 *       200:
 *         description: Portfolio retrieved successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio not found
 */
router.get("/:id", authenticateJWT, portfolioValidator.validatePortfolioId, catchError, portfolioController.getPortfolioById);

/**
 * @swagger
 * /portfolio/{id}:
 *   put:
 *     summary: Update portfolio by ID
 *     description: Allows an authenticated user to update portfolio details.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Portfolio"
 *               description:
 *                 type: string
 *                 example: "Updated description"
 *     responses:
 *       200:
 *         description: Portfolio updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio not found
 */
router.put("/:id", authenticateJWT, portfolioValidator.updatePortfolio, catchError, portfolioController.updatePortfolio);

/**
 * @swagger
 * /portfolio/{id}:
 *   delete:
 *     summary: Delete portfolio by ID
 *     description: Deletes a specific portfolio.
 *     tags: [Portfolio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Portfolio ID
 *     responses:
 *       200:
 *         description: Portfolio deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Portfolio not found
 */
router.delete("/:id", authenticateJWT, portfolioValidator.validatePortfolioId, catchError, portfolioController.deletePortfolio);

export default router;
