import express from "express";
import { fundWallet } from "../controllers/user.controller";

import authenticated from "../middleware/auth";


//use oop to create a class for the routes
class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes() {
        this.router.post('/fund-wallet', authenticated.authMiddleware, fundWallet);
    }
}

const routes = new Routes();

export default routes.router;