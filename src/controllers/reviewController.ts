import { Request, Response } from "express";
import { reviewService } from "../service/reviewService";

export const approveSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const submission = await reviewService.approveSubmission(
            Number(id),
            req.user!.id
        );

        res.status(200).json({
            message: "Submission approved successfully",
            submission
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({message: "Error approving submission"});
    }
};

export const requestChanges = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const submission = await reviewService.requestChanges(
            Number(id),
            req.user!.id
        );

        res.status(200).json({
            message: "Changes requested successfully",
            submission
        });

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            message: "Error requesting changes"
        });
    }
};

export const getReviewHistory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const reviews = await reviewService.getReviewHistory(
            Number(id)
        );

        res.status(200).json(reviews);

    } catch (error) {
        console.error("Controller Error:", error);
        res.status(500).json({
            message: "Error retrieving review history"
        });
    }
};