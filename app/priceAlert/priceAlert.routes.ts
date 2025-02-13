import { Router } from "express";
import passport from "passport";
import * as priceAlertController from "./priceAlert.controller";

const router = Router();
const authenticateJWT = passport.authenticate("jwt", { session: false });

/**
 * @swagger
 * tags:
 *   name: Price Alerts
 *   description: API endpoints for managing user price alerts
 */

/**
 * @swagger
 * /price-alerts:
 *   get:
 *     summary: Get all price alerts of the logged-in user
 *     description: Retrieve all price alerts created by the authenticated user.
 *     tags: [Price Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Price alerts retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/", authenticateJWT, priceAlertController.getUserPriceAlerts);

/**
 * @swagger
 * /price-alerts:
 *   post:
 *     summary: Create a new price alert
 *     description: Create a price alert for a specific cryptocurrency.
 *     tags: [Price Alerts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               symbol:
 *                 type: string
 *                 example: "BTCUSDT"
 *               targetPrice:
 *                 type: number
 *                 example: 50000
 *               condition:
 *                 type: string
 *                 enum: [above, below]
 *                 example: "above"
 *     responses:
 *       201:
 *         description: Price alert created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authenticateJWT, priceAlertController.createPriceAlert);

/**
 * @swagger
 * /price-alerts/all:
 *   get:
 *     summary: Get all price alerts (Admin)
 *     description: Retrieve all price alerts in the system (Admin access).
 *     tags: [Price Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All price alerts retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin access required)
 */
router.get("/all", authenticateJWT, priceAlertController.getAllPriceAlerts);

export default router;
