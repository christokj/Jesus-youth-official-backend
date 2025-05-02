const StudentModel = require("../models/StudentModel");
const argon2 = require('argon2');
const { generateToken } = require("../utils/generateToken");

const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const isPasswordValid = await argon2.verify(process.env.ADMIN_PASSWORD, password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }

        const token = generateToken(username, "admin");

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "None" : "Lax",
        });

        return res.status(200).json({ success: true, message: "Admin login successful", token });
    } catch (error) {
        console.error("Admin login error:", error.message);
        return res.status(500).json({ success: false, message: "Server error during login." });
    }
};

const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find();
        return res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error.message);
        return res.status(500).json({ success: false, message: "Server error fetching students." });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const { name, place, dob } = req.body;

        if (!name || !place || !dob) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const deleted = await StudentModel.findOneAndDelete({ name, place, dob });

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Student not found." });
        }

        return res.status(200).json({ success: true, message: "Student deleted successfully." });
    } catch (error) {
        console.error("Error deleting student:", error.message);
        return res.status(500).json({ success: false, message: "Server error deleting student." });
    }
};

module.exports = {
    getAllStudents,
    adminLogin,
    deleteStudent,
};
