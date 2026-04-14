import { Router } from "express";
import studentRoutes from "./studentRoutes";
import adminRoutes from "./adminRoutes";

const v1Router = Router();

v1Router.use("/user", studentRoutes);
v1Router.use("/admin", adminRoutes);

export default v1Router;
