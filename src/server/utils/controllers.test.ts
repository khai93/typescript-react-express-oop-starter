jest.mock('./routes');
import { Logger } from "../modules/logger/logger";
import { ControllerUtility } from "./controllers";
import { RouteUtility } from './routes';
import Express from 'express';

describe('ControllerUtility Class', () => {
    describe('#setUpController', () => {
        it('should call loadRoutes', () => {
            const Func = jest.fn();
            const routeUtil = new RouteUtility({readdir: Func, pathJoin: Func, logger: new Logger()});

            const controllerUtility = new ControllerUtility({routeUtility: routeUtil, pathResolve: Func});

            controllerUtility.setUpController({router: Express.Router(), dirname: "", parentDependencies: []})

            expect(routeUtil.loadRoutes).toHaveBeenCalled();
        });
    });
});