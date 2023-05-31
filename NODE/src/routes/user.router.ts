import { Router } from "express";

import { userController } from "../controllers";
import { userMiddleware } from "../middlewares";

const router = Router();

router.get("/", userController.getAll);
router.post("/", userMiddleware.isUserValidForCreate, userController.create);

router.get(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getUserDynamically("userId", "params", "_id"),
  userController.getById
);
router.patch(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.isUserValidForUpdate,
  userMiddleware.getUserDynamically("userId", "params", "_id"),
  userController.update
);
router.delete(
  "/:userId",
  userMiddleware.isIdValid,
  userMiddleware.getUserDynamically("userId", "params", "_id"),
  userController.deleteById
);

export const userRouter = router;
