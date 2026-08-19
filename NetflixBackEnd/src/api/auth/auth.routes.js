import express from "express";
import {
  getMe,
  logoutUser,
  loginUser,
  registerUser,
} from "./auth.controller.js";
import protect from "./auth.middleware.js";
import { validateLogin, validateRegister } from "./auth.validation.js";

const router = express.Router();
router.post("/register", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/me", protect, getMe);
router.post("/logout", logoutUser);

export default router;
