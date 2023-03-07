import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userMiddleware } from "../middlewars/user.middleware";

const router = Router();

router.get("/", userController.getAll);

router.get("/:userId", userMiddleware.getByIdAndThrow, userController.getById);

router.post("/", userController.create);

router.patch("/:userId", userController.update);

router.delete("/:userId", userController.delete);

export const userRouter = router;
