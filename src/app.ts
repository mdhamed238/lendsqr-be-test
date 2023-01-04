import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import { errorHandler, notFound } from './errors/errors-handler';

dotenv.config();


class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    public config(): void {
        // Enable security middlewares
        this.app.use(helmet());
        this.app.use(cors());
        this.app.use(compression());

        // express body parser
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));


        // Set up other server configuration here


        // set up 404 error handling here
        this.app.use(notFound)

        // set up global error handling here
        this.app.use(errorHandler)
    }

    public routes(): void {
        // Set up routes here
    }
}

const server = new Server();

export default server.app;