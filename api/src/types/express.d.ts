import { Request as ExpressRequest } from "express";

declare namespace Express {
  export interface Request {
    user?: any;
  }
}
