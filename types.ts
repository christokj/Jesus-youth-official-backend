import { Request } from "express";

export interface TokenPayload {
  email: string;
  role: "admin" | "user";
  iat?: number;
  exp?: number;
}

export interface AdminRequest extends Request {
  admin?: TokenPayload;
}

export interface StudentPayload {
  name: string;
  age: number;
  programYear: 2025 | 2026;
  unit: string;
  address: string;
  mobile: number;
  place: string;
  maritalStatus: string;
  dob: string;
  parish: string;
  gender: string;
  prayerRequest?: string;
  paid?: boolean;
  visited?: boolean;
}

export interface AdminPayload {
  username: string;
  email: string;
  password: string;
}
