import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TaskController } from "../controllers/TaskControllers";

const router = Router();

router.use(authMiddleware); 

router.post("/", TaskController.createTask);
router.get("/:userId", TaskController.getByUser);

export default router;