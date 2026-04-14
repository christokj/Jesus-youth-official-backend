import jwt, { SignOptions } from "jsonwebtoken";

export const generateToken = (
  email: string,
  role: "admin" | "user" = "user",
  expiresIn: SignOptions["expiresIn"] = "3h",
) => {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not configured");
  }

  return jwt.sign({ email, role }, secret, { expiresIn });
};
