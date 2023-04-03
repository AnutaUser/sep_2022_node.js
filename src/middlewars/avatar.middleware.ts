import { NextFunction, Request, Response } from "express";

import { avatarConfigs } from "../configs";
import { ApiError } from "../errors";

class AvatarMiddleware {
  public async isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No file to upload", 400);
      }

      if (Array.isArray(req.files.photo)) {
        throw new ApiError("You can upload only one photo", 400);
      }

      const { size, mimetype, name } = req.files.photo;

      if (size > avatarConfigs.MAX_SIZE) {
        throw new ApiError(`The photo: ${name} is too big`, 400);
      }

      if (!avatarConfigs.MIMETYPES.includes(mimetype)) {
        throw new ApiError(`The photo: ${name} has invalid format`, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const avatarMiddleware = new AvatarMiddleware();
