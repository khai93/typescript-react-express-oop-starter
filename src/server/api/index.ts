import { StatusController } from "./status/statusController";
import LoggerModule from "../modules/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
import { ControllerUtility } from "../utils/controllers";

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger: LoggerModule});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });

/**
 * The default dependencies for every controller
 */
const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: LoggerModule
};

/**
 * Export all controllers as an array to inject inside Server.
 * Also creates a new Controller from each of the controller classes with its dependencies.
 */
export default [
    new StatusController(defaultControllerDependencies)
]