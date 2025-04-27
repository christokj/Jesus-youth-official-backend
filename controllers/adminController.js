const StudentModel = require("../models/StudentModel");

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
    getAllStudents,
};