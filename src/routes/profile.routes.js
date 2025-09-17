
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  getPublicProfile
} from "../controllers/profile.controller.js";
import { CrudController } from "../controllers/user.controller.js";

const router = Router();




const crudController = new CrudController();

router.get("/public", getPublicProfile);
router.patch("/private", authMiddleware, crudController.updatePrivateProfile.bind(crudController));
router.delete("/private", authMiddleware, crudController.deletePrivateProfile.bind(crudController));


export default router;
