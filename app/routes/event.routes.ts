import { getById } from "../controllers/event.controller";
import { Router } from "express";
const router = Router();
export default (app) => {
  router.get("/:id", getById);

  app.use("/api/events", router);
};
