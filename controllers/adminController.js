const StudentModel = require("../models/StudentModel");
const argon2 = require('argon2');
const { generateToken } = require("../utils/generateToken");

const adminLogin = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "All fields required" });
    }

    // const userMatch = bcrypt.compareSync(username, process.env.ADMIN_USER_NAME);

    // if (!adminExist) {
    //     return res.status(404).json({ success: false, message: "Admin does not exist" });
    // }

    // const hash = await argon2.hash(password);
    const passwordMatch = await argon2.verify(process.env.ADMIN_PASSWORD, password);
    // const passwordMatch = bcrypt.compareSync(password, process.env.ADMIN_PASSWORD);

    if (!passwordMatch) {
        return res.status(400).json({ success: false, message: "Wrong password" });
    }

    const token = generateToken(username, role = "admin");

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        maxAge: 1 * 60 * 60 * 1000, // 2 hour
        httpOnly: true,
        secure: isProduction, // Secure only in production
        sameSite: isProduction ? "None" : "Lax", // 'None' for production, 'Lax' for development
    });

    return res.status(200).json({ success: true, message: "Admin login successful", token });
}

const getAllStudents = async (req, res) => {
    try {
        const students = await StudentModel.find(); // Fetch all students
        res.status(200).json(students);         // Return as JSON
    } catch (error) {
        console.error("Error fetching students:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = {
    getAllStudents, adminLogin
};