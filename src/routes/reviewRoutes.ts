import { Router } from "express";
import {approveSubmission, requestChanges, getReviewHistory} from "../controllers/reviewController";

const router = Router();

router.put("/submissions/:id/approve", approveSubmission);

router.put("/submissions/:id/request-changes", requestChanges);

router.get("/submissions/:id/reviews", getReviewHistory);

export default router;