import { Router } from "express";
import { IExecuteable } from "src/types/IExecuteable";
import { Logger } from '../modules/logger/logger';

/**
 * Dependencies for RouteUtility class
 */
export type RouteUtilityDependencies = {
    readdir: Function,
    pathJoin: Function,
    logger: Logger
}

/**
 * Params for the loadRoutes method of RouteUtility class
 */
export type LoadRoutesParams = {
    routesPath: string,
    router: Router,
    parentDependencies: any
}

/**
 * Utility functions to help with routing api routes
 */
export class RouteUtility {
    /**
     * 
     * @param dependencies Dependencies for routeUtility
     */
    constructor(
        private dependencies: RouteUtilityDependencies
    ) {}
    
    /**
     * Loops through all the routes found in the local file path routePath in params.
     * Injects a Router from express and it's parent dependencies.
     * Calls execute method on every route.
     * @param params Params
     * @returns A Promise resolved into an array of routes implementing IExecuteable 
     */
    public async loadRoutes(params: LoadRoutesParams): Promise<IExecuteable[]> {
        try {
            const files = await this.dependencies.readdir(params.routesPath);

            return Promise.resolve(files.map(async route => {
                const routeModule = await import(this.dependencies.pathJoin(params.routesPath, `${route}`));
                
                /**
                 * Assumes that all route modules export a default class whoose dependencies are type RouteDependencies.
                 */
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