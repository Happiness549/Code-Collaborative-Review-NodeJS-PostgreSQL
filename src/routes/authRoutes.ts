import { Router } from "express";
import { register, login } from "../controllers/authController";
import { getAllUsers, getUserById, updateUserById, deleteUserById} from "../controllers/authController";
// import { protect } from "../middleware/authMiddleware";

const router = Router()
// router.use(protect)

router.post('/register', register)
router.post('/login', login)


router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUserById)
router.delete('/users/:id', deleteUserById)

export default router