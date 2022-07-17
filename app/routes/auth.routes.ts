import { register, login } from "../controllers/auth.controller";
import { Router } from "express";
import { verifySignup } from "../middleware";
const router = Router();
export default (app) => {
  router.post(
    "/register",
    [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted],
    register
  );
  router.post("/login", login);

  app.use("/api/auth", router);
};
