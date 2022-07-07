import { authJwt } from "../middleware";

import setEventRoutes from "./event.routes";
import setAuthRoutes from "./auth.routes";

import { Request, Response } from "express";

export default (app) => {
  
  app.get("/", (req: Request, res: Response) => {
    res.json({ message: "hello world" });
  });

  app.get("/api/test/all", (req: Request, res: Response) => {
    res.json({ message: "public" });
  });

  app.get("/api/test/user",[authJwt.verifyToken], (req: Request, res: Response) => {
    res.json({ message: "verifyToken" });
  });
  
  app.get("/api/test/mod",[authJwt.verifyToken , authJwt.isModerator], (req: Request, res: Response) => {
    res.json({ message: "isModerator" });
  });

  app.get("/api/test/admin",[authJwt.verifyToken , authJwt.isAdmin], (req: Request, res: Response) => {
    res.json({ message: "isAdmin" });
  });

  setAuthRoutes(app);
  setEventRoutes(app);
};
