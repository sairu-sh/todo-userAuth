import { Router } from "express";
import {
  createTask,
  getAll,
  getCompleted,
  getRemaining,
  toggleCompleted,
  deleteTask,
} from "../controller/tasks";

const router = Router();

router.get("/", getAll);
router.get("/completed", getCompleted);
router.get("/remaining", getRemaining);
router.post("/", createTask);
router.patch("/:id", toggleCompleted);
router.delete("/:id", deleteTask);

export default router;
