import {Router} from 'express'
import {Submission, getProjectSubmissions,  getSingleSubmission} from '../controllers/submissionControllers'

const router = Router();

router.post('/', Submission);
router.get('/:id/submissions', getProjectSubmissions);
router.get('/:id', getSingleSubmission);
export default router;