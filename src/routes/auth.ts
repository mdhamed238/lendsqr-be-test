import express from "express";
import { login, register } from "../controllers/auth.controller";


class Routes {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.routes();
    }

    public routes() {
        this.router.post('/login', login);
        this.router.post('/register', register);
    }
}


const routes = new Routes();

export default routes.router;



