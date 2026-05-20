import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { Authorize } from '../middleware/authMiddleware.js';

const router = Router();
router.post("/login", authController.authenticate);
router.post("/refresh", authController.refreshAccessToken);
router.get("/verify", Authorize, authController.getUserFromToken);

export const authRoutes = router;
