import { Router } from "express";
import { RouteUtility } from "./routes";

/**
 * Dependencies for ControllerUtility class
 */
export type ControllerUtilityDependencies = {
    pathResolve: Function,
    routeUtility: RouteUtility
}

/**
 * Params for setUpController method of COntrollerUtility class
 */
export interface SetUpControllerParams {
    router: Router,
    dirname: string,
    parentDependencies: any
}

/**
 * Utility functions to help in controllers
 */
export class ControllerUtility {
    /**
     * Sets the dependencie type as a private variable of the class
     * @param dependencies Dependencies
     */
    constructor(
        private dependencies: ControllerUtilityDependencies
    ) {}

    /**
     * Handles getting the current routes path for the dirname passed from params.
     * Loads all the routes in the routes path 
     * @param params Params
     */
    public async setUpController(params: SetUpControllerParams): Promise<void> {
        const routesPath = this.dependencies.pathResolve(params.dirname, "routes");
            
        await this.dependencies.routeUtility.loadRoutes({
            routesPath, 
            router: params.router, 
            parentDependencies: params.parentDependencies
        }); 
    }
}