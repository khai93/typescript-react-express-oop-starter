import { Router } from "express";

export interface IController {
    handler(app: Router): void
}
