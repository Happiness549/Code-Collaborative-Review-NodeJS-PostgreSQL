import { query } from '../config/database';

export const createComment = async (
    submissionId: number,
    userId: number,
    content: string,
    type: "inline" | "general"
) => {
    const result = await query(
        `INSERT INTO comments (submission_id, user_id, content, type)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [submissionId, userId, content, type]
    );

    return result.rows[0];
};

export const getCommentsBySubmission = async (submissionId: number) => {
    const result = await query(
        `SELECT * FROM comments
         WHERE submission_id = $1
         ORDER BY created_at ASC`,
        [submissionId]
    );

    return result.rows;
};

export const updateComment = async (
    id: number,
    content: string
) => {
    const result = await query(
        `UPDATE comments
         SET content = $1, updated_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [content, id]
    );

    return result.rows[0];
};

export const deleteComment = async (id: number) => {
    const result = await query(
        `DELETE FROM comments
         WHERE id = $1
         RETURNING *`,
        [id]
    );

    return result.rows[0];
};