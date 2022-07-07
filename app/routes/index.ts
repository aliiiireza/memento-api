import setEventRoutes from "./event.routes";
import setAuthRoutes from "./auth.routes";

import { Request, Response } from "express";

export default (app) => {
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello world" });
  });

  setAuthRoutes(app);
  setEventRoutes(app);
};
