import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  avatarMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewars";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.patch(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.patch(
  "/:userId/avatar",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  avatarMiddleware.isAvatarValid,
  userController.uploadAvatar
);

router.delete(
  "/:userId/avatar",
  authMiddleware.isAccessTokenValid,
  userMiddleware.getByIdOrThrow,
  userController.deleteAvatar
);

router.delete(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
