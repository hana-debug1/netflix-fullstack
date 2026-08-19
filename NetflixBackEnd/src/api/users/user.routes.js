import express from "express";
import protect from "../auth/auth.middleware.js";
import { getUserProfile } from "./user.controller.js";

const router = express.Router();

router.get("/me", protect, getUserProfile);

export default router;
