import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { loginValidator } from "../middlewares/validators/auth.validator.js";

const router = Router();

router.post("/login", loginValidator, authController.login);

export default router;
