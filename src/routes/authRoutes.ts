import { Router } from "express";
import { register, login } from "../controllers/authController";
import { getAllUsers, getUserById, updateUserById} from "../controllers/authController";

const router = Router()

router.post('/register', register)
router.post('/login', login)


router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUserById)
// router.delete('/application/:id', deleteUserById)

export default router