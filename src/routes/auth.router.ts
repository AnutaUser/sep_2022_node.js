import { Router } from "express";

import { authController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewars";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDynamicallyAndThrow("email"),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
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
  commonMiddleware.isBodyValid(UserValidator.changePass),
  authMiddleware.isAccessTokenValid,
  authController.changePassword
);

export const authRouter = router;
