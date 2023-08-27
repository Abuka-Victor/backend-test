import { Request, Response, NextFunction } from "express";
import { generateToken, verifyToken } from "../utils/token";
import { ACCESS_TOKEN_PRIVATE_KEY, REFRESH_TOKEN_PRIVATE_KEY, NODE_ENV } from "../config/keys"
import client from "../config/redis";
import { User } from "../models";

export const checkAllowedMethods = (req: Request, res: Response, next: NextFunction) => {
  // NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
  const allowedMethods = [
    "OPTIONS",
    "HEAD",
    "CONNECT",
    "GET",
    "POST",
    "PUT",
    "DELETE",
    "PATCH",
  ];

  if (!allowedMethods.includes(req.method)) {
    res.status(405).send(`${req.method} not allowed.`);
  }

  next();
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.accessToken !== undefined) {
    try {
      const token = verifyToken(req.cookies.accessToken, ACCESS_TOKEN_PRIVATE_KEY as string);
      if (token) {
        const user = await User.findByPk(token.user_id)
        if (user) {
          req.user_id = user.id;
        } else {
          return res.status(401).send("Unauthorized");
        }
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    } catch (err) {
      return res.status(401).json({ message: "unauthorized", details: "unable to verify accessToken" })
    }
  } else if (req.cookies.refreshToken !== undefined && await client.sIsMember("whitelist", req.cookies.refreshToken)) {
    try {
      const token = verifyToken(req.cookies.refreshToken, REFRESH_TOKEN_PRIVATE_KEY as string);
      if (token !== null) {
        const user = await User.findByPk(token.user_id)
        if (user) {
          req.user_id = user.id;
        } else {
          return res.status(401).json({ message: "unauthorized" });
        }
        const accessToken = generateToken({ user_id: token.user_id }, ACCESS_TOKEN_PRIVATE_KEY as string, "180000");
        res.cookie("accessToken", accessToken, {
          secure: NODE_ENV !== "development",
          httpOnly: true,
          maxAge: 180000,
        });
      } else {
        return res.status(401).json({ message: "Invalid token" });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: "unauthorized", details: "unable to generate new token" });
    }
  } else {

    return res.status(401).json({ message: "unauthorized" });
  }
}