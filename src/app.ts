import express, { Application } from 'express';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import cors from 'cors';
import helmet from 'helmet';
import client from './db';
export default class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMiddleware(): void {
        this.express.use(helmet());
        this.express.use(cors());
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: false }));
    }
    private initialiseControllers(controllers: Controller[]): void {
        controllers.forEach((controller: Controller) => {
            this.express.use('/api', controller.router);
        });
    }
    private initialiseErrorHandling(): void {
        this.express.use(errorMiddleware);
    }

    private initialiseDatabaseConnection(): void {
        client.connect();
        console.log(client.database);
        console.log(client.query('SELECT * FROM users'));
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
