import { Router } from "express";
import {addComment, getComments, editComment, removeComment} from "../controllers/commentController";

const router = Router();

router.post("/submissions/:id/comments", addComment);

router.get("/submissions/:id/comments", getComments);

router.put("/comments/:id", editComment);

router.delete("/comments/:id", removeComment);

export default router;