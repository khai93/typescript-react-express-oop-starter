import { IExecuteable } from "src/types/core/IExecuteable";
import { RouteDependencies } from "src/types/api/RouteDependencies";
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