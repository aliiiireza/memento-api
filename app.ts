import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import setAppCors from "./app/utils/setAppCors";
import startDatabaseConnection from "./app/database";
import setAppRoutes from "./app/routes";

const app: Express = express();

startDatabaseConnection();
setAppCors(app);
setAppRoutes(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running`);
});
