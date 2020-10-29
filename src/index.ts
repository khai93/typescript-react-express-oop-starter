import { ServerBuilder } from './server/server-builder';
import express from 'express';
import controllers from './server/controllers';
const app = express();

const PORT = parseInt(process.env.PORT) || 8080;

const server = new ServerBuilder(app)
    .setEnv(process.env.NODE_ENV)
    .setPort(PORT)
    .setControllers(controllers)
    .build();

server.start();