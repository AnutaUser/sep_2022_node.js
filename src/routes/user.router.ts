import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewars";

const router = Router();

router.get("/", userController.getAll);

router.post("/", userMiddleware.isUserValidForCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.patch(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.isUserValidForUpdate,
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getByIdOrThrow,
  userController.delete
);

export const userRouter = router;
