const express = require("express");
// const { createMenuItem, getMenuItems, deleteMenuItem } = require("../../controllers/menuItemController");
const asyncHandler = require("../../utils/asyncHandler");
const { createStudent } = require("../../controllers/studentsController");

const router = express.Router();

router.post("/register", asyncHandler(createStudent));
// router.get("/fetch-menu/:menuName", asyncHandler(getMenuItems));
// router.delete("/delete-item/:id", asyncHandler(deleteMenuItem))
module.exports = router;