import { Router } from "express";
import { getAllProjects, addProject } from "../controllers/projectAuth";
import { protect } from "../middleware/authMiddleware";

const router = Router()


router.post('/project', protect, addProject)
router.get('/projects', getAllProjects)

export default router