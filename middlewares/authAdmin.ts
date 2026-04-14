import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminRequest, TokenPayload } from "../types";

export const authAdmin = (req: AdminRequest, res: Response, next: NextFunction) => {
  const { token } = req.cookies as { token?: string };

  if (!token) {
    return res.status(400).json({ success: false, message: "Admin not authenticated" });
  }

  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    return res.status(500).json({ success: false, message: "JWT secret is not configured" });
  }

  let tokenVerified: TokenPayload;

  try {
    tokenVerified = jwt.verify(token, secret) as TokenPayload;
  } catch {
    return res.status(401).json({ success: false, message: "Admin session expired or invalid." });
  }

  if (!tokenVerified || tokenVerified.role !== "admin") {
    return res.status(401).json({ success: false, message: "Admin not authenticated" });
  }

  req.admin = tokenVerified;
  next();
};
