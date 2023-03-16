import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
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

router.delete(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
