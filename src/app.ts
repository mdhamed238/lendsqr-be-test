import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import compression from 'compression';
import { errorHandler, notFound } from './errors/errors-handler';
import authRouter from './routes/auth';
import userRouter from './routes/user';

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


        // routes
        this.app.use('/api/v1', authRouter);
        this.app.use('/api/v1', userRouter);



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