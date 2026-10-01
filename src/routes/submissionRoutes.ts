import {Router} from 'express'
import {Submission, getProjectSubmissions} from '../controllers/submissionControllers'

const router = Router();

router.post('/', Submission);
router.get('/:id/submissions', getProjectSubmissions);

export default router;