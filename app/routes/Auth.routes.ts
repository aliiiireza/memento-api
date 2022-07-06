import { register, login } from "../controllers/Auth.controller";
import { Router } from "express";
const router = Router();
export default (app) => {
  router.post("/register", register);
  router.post("/login", login);

  app.use("/api/auth", router);
};
