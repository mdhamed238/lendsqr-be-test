import express from "express";
import {
    viewTransactionHistory,
    fundWallet,
    transferFunds,
    withdrawFunds,
    viewBalance,
    viewTransactionDetails,
    totalAmount
} from "../controllers/user.controller";

import authenticated from "../middleware/auth";


class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes() {
        this.router.post('/fund-wallet', authenticated.authMiddleware, fundWallet);
        this.router.post('/transfer-funds', authenticated.authMiddleware, transferFunds);
        this.router.post('/withdraw-funds', authenticated.authMiddleware, withdrawFunds);
        this.router.get('/view-balance', authenticated.authMiddleware, viewBalance);
        this.router.get('/view-transaction-history', authenticated.authMiddleware, viewTransactionHistory);
        this.router.get('/view-transaction-details/:transaction_id', authenticated.authMiddleware, viewTransactionDetails);
        this.router.get('/total-amount', authenticated.authMiddleware, totalAmount);
    }
}

const routes = new Routes();

export default routes.router;