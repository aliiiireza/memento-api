import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();

import setAppCors from "./app/utils/setAppCors";
import startDatabaseConnection from "./app/database";
import setAppRoutes from "./app/routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

startDatabaseConnection();
setAppCors(app);
setAppRoutes(app);


app.listen(process.env.PORT, () => {
  console.log(`⚡️[server]: Server is running`);
});
