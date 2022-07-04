import { getById } from "../controllers/Event.controller";
import { Router } from "express";
const router = Router();
export default (app) => {
  router.get("/:id", getById);

  app.use("/api/events", router);
};
