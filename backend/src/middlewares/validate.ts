import { ZodType, ZodError, treeifyError } from "zod/v4";
import { Request, Response, NextFunction } from "express";

export const validate = (schema: ZodType<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: treeifyError(error)
        });
        return;
      }
      next(error);
    }
  };
