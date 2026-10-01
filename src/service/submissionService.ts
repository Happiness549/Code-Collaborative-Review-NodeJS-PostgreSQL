import {query} from '../config/database'
import {Submission} from '../types/user.types'



export const createSubmissions = async (projectId: number, submissionData:Omit<Submission, 'id' | 'projectId' | 'createdAt'>) => {
  const { title, code, fileName, status } = submissionData;
  
  
  const { rows } = await query(
    `INSERT INTO submissions (project_id, title, code, file_name, status) 
     VALUES ($1, $2, $3, $4, $5) 
     RETURNING *`, 
    [projectId, title, code, fileName, status] 
  );
  
  return rows[0];
};

export const getSubmissionsByProject = async (projectId: number) => {
  const { rows } = await query(
    `SELECT * FROM submissions 
     WHERE project_id = $1 
     ORDER BY created_at DESC`, 
    [projectId]
  );
  
  return rows;
};

export const getSubmissionById = async (id: number) => {
  const { rows } = await query(
    `SELECT * FROM submissions 
     WHERE id = $1`, 
    [id]
  );
  
  return rows[0] || null; 
};

