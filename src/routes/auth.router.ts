import { Router } from "express";

import { authController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewars";

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

router.post(
  "/refresh",
  authMiddleware.isRefreshTokenValid,
  authController.refresh
);

router.post(
  "/password/change",
  userMiddleware.isChangePasswordValid,
  authMiddleware.isAccessTokenValid,
  authController.changePassword
);

export const authRouter = router;
