import { Router } from "express";
import {
  createStudent,
  getPreviousYearStudentById,
  searchPreviousYearStudents,
} from "../../controllers/studentsController";
import { authAdmin } from "../../middlewares/authAdmin";
import asyncHandler from "../../utils/asyncHandler";

const router = Router();

router.get("/previous-year/search", asyncHandler(authAdmin), asyncHandler(searchPreviousYearStudents));
router.get("/previous-year/:id", asyncHandler(authAdmin), asyncHandler(getPreviousYearStudentById));
router.post("/register", asyncHandler(createStudent));

export default router;
