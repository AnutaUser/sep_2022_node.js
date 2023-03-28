import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { userService } from "../services";
import { ICommonResponse, IQuery, IUser } from "../types";

class UserController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser[]>> {
    try {
      const users = await userService.getAllWithPagination(
        req.query as unknown as IQuery
      );
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const { user } = res.locals;

      return res.json(user);
    } catch (e) {
      next(e);
    }
  }

  // public async create(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction
  // ): Promise<Response<ICommonResponse<IUser>>> {
  //   try {
  //     await userService.create(req.body);
  //
  //     return res.status(201).json({
  //       message: "user created",
  //     });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<IUser>>> {
    try {
      const { userId } = req.params;
      const body = req.body;

      await userService.update(userId, body);

      return res.status(201).json({
        message: "User updated",
      });
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;
      const { name, email } = req.res.locals.user;

      await userService.delete(userId, email, name);

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async uploadAvatar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      const avatar = req.files.avatar as UploadedFile;
      const user = await userService.uploadAvatar(avatar, userId);

      return res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
