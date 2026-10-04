import { query } from "../config/database";

export const reviewService = {

    approveSubmission: async (
        submissionId: number,
        reviewerId: number
    ) => {
        const result = await query(
            `UPDATE submissions
             SET status = 'approved'
             WHERE id = $1
             RETURNING *`,
            [submissionId]
        );

        await query(
            `INSERT INTO reviews (submission_id, reviewer_id, status)
             VALUES ($1, $2, $3)`,
            [submissionId, reviewerId, "approved"]
        );

        return result.rows[0];
    },

    requestChanges: async (
        submissionId: number,
        reviewerId: number
    ) => {
        const result = await query(
            `UPDATE submissions
             SET status = 'changes_requested'
             WHERE id = $1
             RETURNING *`,
            [submissionId]
        );

        await query(
            `INSERT INTO reviews (submission_id, reviewer_id, status)
             VALUES ($1, $2, $3)`,
            [submissionId, reviewerId, "changes_requested"]
        );

        return result.rows[0];
    },

    getReviewHistory: async (submissionId: number) => {
        const result = await query(
            `SELECT * FROM reviews
             WHERE submission_id = $1
             ORDER BY created_at ASC`,
            [submissionId]
        );

        return result.rows;
    }

};