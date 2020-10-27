import { Server } from './server';
import { Express } from 'express';

export class ServerBuilder {
    private readonly _app: Express;
    private _env: string = 'development';
    private _port: number = 8080;

    constructor(app: Express) {
        this._app = app;
    }

    setEnv(env: string) {
        this._env = env;
        return this;
    }

    setPort(port: number) {
        this._port = port;
        return this;
    }

    build() {
        return new Server(this);
    }

    get app() {
        return this._app;
    }

    get env() {
        return this._env;
    }

    get port() {
        return this._port;
    }
}