import { Router } from "express";

export default (app: Router) => {
   app.get('/', (req, res) => {
        res.sendStatus(200);
   }); 
}