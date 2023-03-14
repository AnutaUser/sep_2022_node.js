import { Router } from "express";

import { userController } from "../controllers";
import { authMiddleware, userMiddleware } from "../middlewars";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.patch(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  userMiddleware.isIdValid,
  userMiddleware.isUserValidForUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.isAccessTokenValid,
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
