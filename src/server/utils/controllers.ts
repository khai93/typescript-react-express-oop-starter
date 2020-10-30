import { Router } from "express";
import { RouteUtility } from "./routes";

export type ControllerUtilityDependencies = {
    pathResolve: Function,
    routeUtility: RouteUtility
}

export interface SetUpControllerParams {
    router: Router,
    dirname: string,
    parentDependencies: any
}

export class ControllerUtility {
    constructor(
        private dependencies: ControllerUtilityDependencies
    ) {}

    public async setUpController(params: SetUpControllerParams): Promise<void> {
        const routesPath = this.dependencies.pathResolve(params.dirname, "routes");
            
        await this.dependencies.routeUtility.loadRoutes({
            routesPath, 
            router: params.router, 
            parentDependencies: params.parentDependencies
        }); 
    }
}