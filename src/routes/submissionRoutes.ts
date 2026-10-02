import {Router} from 'express'
import {Submission, getProjectSubmissions,  getSingleSubmission, updateSubmissionStatus, deleteSubmission} from '../controllers/submissionControllers'

const router = Router();

router.post('/', Submission);
router.get('/:id/submissions', getProjectSubmissions);
router.get('/:id', getSingleSubmission);
router.patch("/submissions/:id/status", updateSubmissionStatus);
router.delete("/submissions/:id", deleteSubmission);
export default router;