import { StatusController } from "./status/statusController";
import LoggerModule from "../modules/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
import { ControllerUtility } from "../utils/controllers";

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger: LoggerModule});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });

const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: LoggerModule
};

export default [
    new StatusController(defaultControllerDependencies)
]