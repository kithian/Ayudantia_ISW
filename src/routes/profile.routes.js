
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile,
  updatePrivateProfile,
  deletePrivateProfile,
} from "../controllers/profile.controller.js";

const router = Router();



router.get("/public", getPublicProfile);
router.patch("/private", authMiddleware, updatePrivateProfile);
router.delete("/private", authMiddleware, deletePrivateProfile);


export default router;
