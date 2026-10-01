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