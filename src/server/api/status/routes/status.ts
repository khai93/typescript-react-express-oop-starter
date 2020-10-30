import { IExecuteable } from "../../IExecuteable";
import { RouteDependencies } from "../../RouteDependencies";
import { StatusControllerDependencies } from "../statusController";

export default class StatusRoute implements IExecuteable {
   constructor(
      private dependencies: RouteDependencies,
      private parentDependencies: StatusControllerDependencies
   ) { }

   public execute() {
      this.dependencies.router.get('/', (req, res) => {
         res.sendStatus(200);
      });
   }
}