import { Request, Response } from "express";
import StudentModel from "../models/StudentModel";

const previousYearQuery = {
  $or: [{ programYear: 2025 }, { programYear: { $exists: false } }, { programYear: null }],
};

export const createStudent = async (req: Request, res: Response) => {
  try {
    const { name, age, unit, address, mobile, place, maritalStatus, dob, parish, gender, prayerRequest } = req.body;
    const requestedYear = Number(req.body.programYear);
    const programYear = Number.isInteger(requestedYear) ? requestedYear : new Date().getFullYear();

    if (!name || !age || !unit || !address || !mobile || !place || !maritalStatus || !dob || !gender || !parish) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (![2025, 2026].includes(programYear)) {
      return res.status(400).json({ message: "Program year must be 2025 or 2026" });
    }

    const student = new StudentModel({
      name,
      age,
      programYear,
      unit,
      address,
      mobile,
      place,
      maritalStatus,
      dob,
      parish,
      gender,
      prayerRequest: typeof prayerRequest === "string" ? prayerRequest.trim() : "",
    });

    await student.save();

    return res.status(201).json({ message: "Registration saved successfully", programYear });
  } catch {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const searchPreviousYearStudents = async (req: Request, res: Response) => {
  try {
    const name = String(req.query.name || "").trim();

    if (name.length < 2) {
      return res.status(200).json([]);
    }

    const students = await StudentModel.find({
      ...previousYearQuery,
      name: { $regex: name, $options: "i" },
    })
      .sort({ name: 1, createdAt: -1 })
      .limit(20)
      .select("_id name unit place mobile");

    return res.status(200).json(students);
  } catch {
    return res.status(500).json({ message: "Failed to search previous year registrations." });
  }
};

export const getPreviousYearStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Candidate id is required." });
    }

    const student = await StudentModel.findOne({
      _id: id,
      ...previousYearQuery,
    }).select("-paid -visited -createdAt -updatedAt -__v");

    if (!student) {
      return res.status(404).json({ message: "Candidate not found in 2025 registrations." });
    }

    return res.status(200).json(student);
  } catch {
    return res.status(500).json({ message: "Failed to fetch candidate details." });
  }
};
