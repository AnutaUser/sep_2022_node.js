import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType } from "../enums";
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

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  authMiddleware.isActionTokenValid(EActionTokenType.forgot),
  authController.setForgotPassword
);

router.post(
  "/activate",
  commonMiddleware.isBodyValid(UserValidator.emailValidator),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.sendActivateToken
);

router.put(
  "/activate/:token",
  authMiddleware.isActionTokenValid(EActionTokenType.activate),
  authController.activate
);

export const authRouter = router;
