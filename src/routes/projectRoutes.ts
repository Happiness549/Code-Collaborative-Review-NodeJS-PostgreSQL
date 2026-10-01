import { Router } from "express";
import { getAllProjects, addProject, assignMemberToProject, removeUserFromProject} from "../controllers/projectAuth";
import { protect } from "../middleware/authMiddleware";

const router = Router()


router.post('/projects', protect, addProject)
router.get('/projects', getAllProjects)
router.post('/:id/members', assignMemberToProject)
router.delete('/:id/members/:userId', removeUserFromProject)

export default router