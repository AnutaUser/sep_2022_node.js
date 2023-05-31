import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware } from "../middlewares";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/login",
  authMiddleware.isDataValid,
  userMiddleware.getUserDynamically("email"),
  authController.login
);

export const authRouter = router;
