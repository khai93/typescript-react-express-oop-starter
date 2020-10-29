import { StatusController } from "./status/StatusController";
import { readdir } from 'fs/promises';
import { Logger } from "../logger/logger";

export default [
    new StatusController({ readdir, logger: new Logger() })
]