import { StatusController } from "./status/statusController";
import { Logger } from "../logger/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
import { ControllerUtility } from "../utils/controllers";

const logger = new Logger();

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });

const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: logger
};

export default [
    new StatusController(defaultControllerDependencies)
]