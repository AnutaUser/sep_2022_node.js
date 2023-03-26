import { Router } from "express";

import { carController } from "../controllers";
import { authMiddleware, carMiddleware, commonMiddleware } from "../middlewars";
import { CarValidator } from "../validators";

const router = Router();

router.get("/", carController.getAll);
router.post(
  "/",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isBodyValid(CarValidator.createCar),
  carController.create
);

router.get(
  "/:carId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.patch(
  "/:carId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.updateCar),
  carMiddleware.getByIdOrThrow,
  carController.update
);

router.delete(
  "/:carId",
  authMiddleware.isAccessTokenValid,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
