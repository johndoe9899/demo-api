import express from "express";
const router = express.Router();
import authController from "../controllers/authController.js";

// router.get("/users",authController.getUsers);
// Public Routes
router.post("/register",authController.userRegistration);
router.post("/login",authController.userLogin);


export default router;
