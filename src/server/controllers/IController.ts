import { Express } from "express";

export interface IController {
    handler(app: Express): void
}
