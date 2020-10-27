import express, { Express, Request, Response } from 'express';
import { ServerBuilder } from './server-builder';
import path from 'path';

export class Server {
    private _app: Express;
    private _port: number;
    private _env: String;

    constructor(serverBuilder: ServerBuilder) {
        this._app = serverBuilder.app;
        this._port = serverBuilder.port;
        this._env = serverBuilder.env;

        this._app.get("/api/status", (req: Request, res: Response): void => {
            res.sendStatus(200);
        });

        if (this._env == 'production') {
            this._app.use(express.static(path.resolve("./") + "/build/client"));
            
            this._app.get("*", (req: Request, res: Response) => {
                res.sendFile(path.resolve("./") + "/build/client/index.html");
            });
        }
    }

    public start(): void {
        this._app.listen(this._port, () => console.log(`Server started at port ${this._port}`))
    }
}