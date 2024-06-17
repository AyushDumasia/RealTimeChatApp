import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError.utils";
import { AsyncHandler } from "../utils/AsyncHandler.utils";
import jwt from "jsonwebtoken";

export const validateToken = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie: string | undefined | null = req.cookies?.userCookie;

    if (!cookie) throw new ApiError(400, "User cookie not found");
    const token: string | undefined = process.env.ACCESS_TOKEN;
    jwt.verify(
      cookie!,
      token!,
      (error: jwt.VerifyErrors | null, decoded: any) => {
        if (error) {
          return next(new ApiError(401, "Invalid token"));
        }
        req.user = decoded.user;
        next();
      }
    );
  }
);
