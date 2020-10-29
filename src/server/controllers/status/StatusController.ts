import { Router } from "express";
import path from "path";
import { Logger } from "src/server/logger/logger";
import { IController } from "../IController";

type StatusDependencies = {
    readdir: Function,
    logger: Logger
}

export class StatusController implements IController {
    private _router: Router;

    constructor(
        private dependencies: StatusDependencies
    ) {}

    public handler(app: Router): void {
        this._router = Router();

        app.use("/status", this._router);

        this.loadRoutes();
    }

    private async loadRoutes(): Promise<void> {
        try {
            const files = await this.dependencies.readdir(path.join(__dirname, "/routes"));
  
            files.map(async route => {
                const routeModule = await import(`./routes/${route}`);
                routeModule.default(this._router);
            });
        } catch (e) {
            this.dependencies.logger.error(e);
        }
    }   
}