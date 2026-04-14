import { Router } from "express";
import {
  adminLogin,
  deleteAdmin,
  deleteStudent,
  getAllAdmins,
  getAllStudents,
  updateGender,
  updateStudent,
  updateVisited,
} from "../../controllers/adminController";
import { authAdmin } from "../../middlewares/authAdmin";
import asyncHandler from "../../utils/asyncHandler";

const router = Router();

router.post("/login", asyncHandler(adminLogin));
router.post("/update-paid", asyncHandler(authAdmin), asyncHandler(updateStudent));
router.post("/update-gender", asyncHandler(authAdmin), asyncHandler(updateGender));
router.post("/update-visited", asyncHandler(authAdmin), asyncHandler(updateVisited));
router.get("/get-data", asyncHandler(authAdmin), asyncHandler(getAllStudents));
router.get("/get-admins", asyncHandler(authAdmin), asyncHandler(getAllAdmins));
router.delete("/delete-admin/:id", asyncHandler(authAdmin), asyncHandler(deleteAdmin));
router.delete("/delete-student/:id", asyncHandler(authAdmin), asyncHandler(deleteStudent));

export default router;
