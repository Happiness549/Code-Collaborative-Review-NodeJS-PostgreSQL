import { Request, Response } from "express";
import * as commentService from '../service/commentsServic'


export const addComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content, type } = req.body;

        const comment = await commentService.createComment(Number(id),req.user!.id, content,type);

        res.status(201).json({message: "Comment added successfully",comment});

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({message: "Error in adding comment"});
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const comments = await commentService.getCommentsBySubmission(
            Number(id)
        );

        res.status(200).json(comments);

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({message: "Error retrieving comments"});
    }
};

export const editComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await commentService.updateComment(
            Number(id),
            content
        );

        res.status(200).json({message: "Comment updated successfully",comment});

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({message: "Error updating comment"});
    }
};

export const removeComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const comment = await commentService.deleteComment(
            Number(id)
        );

        res.status(200).json({message: "Comment deleted successfully",comment});

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({message: "Error deleting comment"});
    }
};