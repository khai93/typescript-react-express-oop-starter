import { StatusController } from "./status/statusController";
import { Logger } from "../logger/logger";
import { RouteUtility } from "../utils/routes";
import { join, resolve } from 'path';
import { readdir } from 'fs/promises';
<<<<<<< HEAD
=======
import { WeatherController } from "./weather/weatherController";
>>>>>>> 0b534e81131d0f3866b99782f30f365e52d55e4c
import { ControllerUtility } from "../utils/controllers";

const logger = new Logger();

const RouteUtilityDep = new RouteUtility({ readdir, pathJoin: join, logger});
const ControllerUtilityDep = new ControllerUtility({ pathResolve: resolve, routeUtility: RouteUtilityDep });

const defaultControllerDependencies = { 
    controllerUtility: ControllerUtilityDep,
    logger: logger
};

export default [
<<<<<<< HEAD
    new StatusController(defaultControllerDependencies)
=======
    new StatusController(defaultControllerDependencies),
    new WeatherController(defaultControllerDependencies)
>>>>>>> 0b534e81131d0f3866b99782f30f365e52d55e4c
]