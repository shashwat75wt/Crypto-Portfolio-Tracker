import { Router } from "express";
import { getCryptoPrice } from "./cryptoPrice.controller";
import { validateCryptoPriceQuery } from "./cryptoPrice.validation";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Crypto Price
 *   description: API to fetch real-time cryptocurrency prices
 */

/**
 * @swagger
 * /crypto-price:
 *   get:
 *     summary: Get real-time cryptocurrency price
 *     description: Fetches the latest price of a cryptocurrency using its symbol (e.g., BTCUSDT).
 *     tags: [Crypto Price]
 *     parameters:
 *       - in: query
 *         name: symbol
 *         required: true
 *         schema:
 *           type: string
 *         example: "BTCUSDT"
 *         description: The trading symbol of the cryptocurrency (must match Binance symbols).
 *     responses:
 *       200:
 *         description: Real-time price retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 symbol:
 *                   type: string
 *                   example: "BTCUSDT"
 *                 price:
 *                   type: number
 *                   example: 48250.75
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-13T12:30:00Z"
 *       400:
 *         description: Validation error (missing or invalid symbol)
 *       500:
 *         description: Server error
 */
router.get("/", validateCryptoPriceQuery, getCryptoPrice);

export default router;
