import express from "express";
import userRoutes from "./user/user.route";
import portfolioRoutes from "./portfolio/portfolio.route"
import transactionRoutes from "./transaction/transaction.route"
import cryptoPriceRoutes from "./cryptoPrice/cryptoPrice.route"
// import profitLossRoute from "./profitLoss/profitLoss.route"
import priceAlertRoutes from "./priceAlert/priceAlert.routes"
// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/portfolio", portfolioRoutes )
router.use("/transactions", transactionRoutes)
router.use("/cryptoPrice", cryptoPriceRoutes)
router.use("./priceAlerts", priceAlertRoutes)




export default router;