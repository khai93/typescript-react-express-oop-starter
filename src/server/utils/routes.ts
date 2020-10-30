import { Router } from "express";
import { IExecuteable } from "../api/IExecuteable";
import { Logger } from "../logger/logger";

export type RouteUtilityDependencies = {
    readdir: Function,
    pathJoin: Function,
    logger: Logger
}

export type LoadRoutesParams = {
    routesPath: string,
    router: Router,
    parentDependencies: any
}

export class RouteUtility {
    constructor(
        private dependencies: RouteUtilityDependencies
    ) {}

    public async loadRoutes(params: LoadRoutesParams): Promise<IExecuteable[]> {
        try {
            const files = await this.dependencies.readdir(params.routesPath);

            return Promise.resolve(files.map(async route => {
                const routeModule = await import(this.dependencies.pathJoin(params.routesPath, `${route}`));
                
                const routeObj = new routeModule.default({ 
                    router: params.router, 
                    parentDependencies: params.parentDependencies 
                });

                routeObj.execute();

                return routeObj; 
            }));
        } catch (e) {
            this.dependencies.logger.error(e);
        }
    }

}