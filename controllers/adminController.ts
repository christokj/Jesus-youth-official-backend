import { Request, Response } from "express";
import argon2 from "argon2";
import AdminModel from "../models/AdminModel";
import StudentModel from "../models/StudentModel";
import { generateToken } from "../utils/generateToken";

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const username = req.body.username?.trim();
    const password = req.body.password as string | undefined;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordValid = await argon2.verify(admin.password, password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const token = generateToken(username, "admin", "3h");
    const isProduction = process.env.NODE_ENV === "production";
    const expiresAt = Date.now() + 3 * 60 * 60 * 1000;

    res.cookie("token", token, {
      maxAge: 3 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });

    return res.status(200).json({ success: true, message: "Admin login successful", token, expiresAt });
  } catch {
    return res.status(500).json({ success: false, message: "Server error during login." });
  }
};

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const requestedYear = Number(req.query.year);
    const hasValidYear = [2025, 2026].includes(requestedYear);

    let query: Record<string, unknown> = {};

    if (hasValidYear) {
      query =
        requestedYear === 2025
          ? {
              $or: [{ programYear: 2025 }, { programYear: { $exists: false } }, { programYear: null }],
            }
          : { programYear: requestedYear };
    }

    const students = await StudentModel.find(query).sort({ createdAt: -1 });
    return res.status(200).json(students);
  } catch {
    return res.status(500).json({ success: false, message: "Server error fetching students." });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: "Id is required." });
    }

    const deleted = await StudentModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    return res.status(200).json({ success: true, message: "Student deleted successfully." });
  } catch {
    return res.status(500).json({ success: false, message: "Server error deleting student." });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { id, paid } = req.body as { id?: string; paid?: boolean };

    if (!id || paid === null || paid === undefined) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const status = await StudentModel.findByIdAndUpdate(id, { paid });
    if (!status) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    return res.status(200).json({ success: true, message: "Data updated successfully." });
  } catch {
    return res.status(500).json({ success: false, message: "Server error updating student." });
  }
};

export const updateGender = async (req: Request, res: Response) => {
  try {
    const { id, gender } = req.body as { id?: string; gender?: string };

    if (!id || !gender) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    const status = await StudentModel.findByIdAndUpdate(id, { gender });
    if (!status) {
      return res.status(404).json({ success: false, message: "Student not found." });
    }

    return res.status(200).json({ success: true, message: "Data updated successfully." });
  } catch {
    return res.status(500).json({ success: false, message: "Server error updating student." });
  }
};

export const updateVisited = async (req: Request, res: Response) => {
  const { id, visited } = req.body as { id?: string; visited?: boolean };

  if (!id || visited === null || visited === undefined) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    await StudentModel.findByIdAndUpdate(id, { visited });
    return res.status(200).send({ success: true });
  } catch {
    return res.status(500).send({ success: false, message: "Failed to update visited status" });
  }
};

export const getAllAdmins = async (_req: Request, res: Response) => {
  try {
    const admins = await AdminModel.find().select("-password");
    return res.status(200).json(admins);
  } catch {
    return res.status(500).json({ success: false, message: "Server error fetching admins." });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      return res.status(400).json({ success: false, message: "Id is required." });
    }

    const deleted = await AdminModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Admin not found." });
    }

    return res.status(200).json({ success: true, message: "Admin deleted successfully." });
  } catch {
    return res.status(500).json({ success: false, message: "Server error deleting admin." });
  }
};
