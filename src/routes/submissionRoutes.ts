import {Router} from 'express'
import {Submission} from '../controllers/submissionControllers'

const router = Router();

router.post('/', Submission);

export default router;