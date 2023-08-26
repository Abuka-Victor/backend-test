import { NextFunction, Request, Response } from "express"
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error)
    res.status(500).json({ error: error.message });
  else
    next();
}