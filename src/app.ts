import express, { Application } from 'express';
import Controller from './utils/interfaces/controller.interface';
import errorMiddleware from './middleware/error.middleware';
import cors from 'cors';
import helmet from 'helmet';
import client from './db';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
export default class App {
    public express: Application;
    public port: number;
    constructor(controllers: Controller[], port: number) {
        this.express = express();
        this.port = port;

        this.initialiseMorgan();
        this.initialiseDatabaseConnection();
        this.initialiseMiddleware();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseMorgan(): void {
        const logDirectory = path.join(__dirname);
        const logFile = path.join(logDirectory, 'access.log');

        const testLogStream = fs.createWriteStream(logFile, { flags: 'a' });
        // Ensure the log directory exists
        if (!fs.existsSync(logDirectory)) {
            fs.mkdirSync(logDirectory);
        }

        const accessLogStream = fs.createWriteStream(logFile, { flags: 'a' });

        // Add error handling for the write stream

        this.express.use(
            morgan('common', {
                stream: accessLogStream,
            }),
        );

        console.log('morgan initialised');
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
        console.log('Database connection initialised');
    }
    public listen(): void {
        this.express.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}
