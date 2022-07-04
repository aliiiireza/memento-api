import setEventRoutes from "./Event.routes";
import { Request, Response } from "express";

export default (app) => {
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello world" });
  });

  setEventRoutes(app);
};
