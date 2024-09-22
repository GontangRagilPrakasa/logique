import express, { Express } from "express";
import dotenv from "dotenv";
import routes from './routes';
import bodyParser from 'body-parser';
import apiKeyMiddleware from "./middlewares/apiKeyMiddleware";
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './documentation/swaggerOptions';
import expressBasicAuth from "express-basic-auth";

dotenv.config();

const app: Express = express();
app.use(bodyParser.json());


const APP_SWAGGER_PASSWORD = process.env.APP_SWAGGER_PASSWORD ?? "passowrd"
const authMiddleware = expressBasicAuth({
    users: { "admin": APP_SWAGGER_PASSWORD }, 
    challenge: true, 
});

app.use('/api-docs',authMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use(apiKeyMiddleware);

app.use(routes);

export default app;