import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TaskController } from "../controllers/TaskControllers";

const router = Router();

router.post("/tasks", authMiddleware, TaskController.createTask);
router.get("/tasks", authMiddleware, TaskController.getByUser);

export default router;