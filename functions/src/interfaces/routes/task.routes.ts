import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TaskController } from "../controllers/TaskControllers";

const router = Router();

router.use(authMiddleware); 

router.post("/", TaskController.createTask);
router.get("/:userId", TaskController.getByUser);
router.put('/:id', TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask);

export default router;