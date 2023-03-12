import { Router } from "express";

import { authController } from "../controllers";
import { userMiddleware } from "../middlewars";

const router = Router();

router.post(
  "/register",
  userMiddleware.isUserValidForCreate,
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  userMiddleware.isLoginValid,
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.login
);

export const authRouter = router;
