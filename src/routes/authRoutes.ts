import { Router } from "express";
import { register, login } from "../controllers/authController";
import {findUserById} from '../service/userService'

const router = Router()

router.post('/register', register)
router.post('/login', login)


// router.get('/application', getAllUsers)
router.get('/users/:id', findUserById)
// router.put('/application/:id', updateUserById)
// router.delete('/application/:id', deleteUserById)

export default router