const StudentModel = require("../models/StudentModel");

exports.createStudent = async (req, res) => {
    try {
        const { name, age, unit, address, mobile, place, maritalStatus, dob, parish } = req.body;

        console.log(name, age, unit, address, mobile, place, maritalStatus, dob, parish)

        // Validate the request
        if (!name || !age || !unit || !address || !mobile || !place || !maritalStatus || !dob || !parish) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new menu item
        const student = new StudentModel({
            name, age, unit, address, mobile, place, maritalStatus, dob, parish
        });

        // Save the menu item to the database
        await student.save();
        console.log(student)
        return res.status(201).json({ message: "Menu item created successfully" });
    } catch (error) {
        console.error("Error creating menu item:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

// exports.getMenuItems = async (req, res) => {
//     try {
//         const { menuName } = req.params; // Extract menu name from params

//         // Find all menu items associated with this menu
//         const menuItems = await MenuItem.find({ menu: menuName });

//         return res.status(200).json({ message: "Menu items fetched successfully", menuItems });
//     } catch (error) {
//         console.error("Error fetching menu items:", error);
//         return res.status(500).json({ message: "Internal server error" });
//     }
// };

// exports.deleteMenuItem = async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Find and delete the menu item
//         const deletedItem = await MenuItem.findByIdAndDelete(id);

//         if (!deletedItem) {
//             return res.status(404).json({ message: "Menu item not found" });
//         }

//         res.status(200).json({ message: "Menu item deleted successfully", deletedItem });
//     } catch (error) {
//         console.error("Error deleting menu item:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };