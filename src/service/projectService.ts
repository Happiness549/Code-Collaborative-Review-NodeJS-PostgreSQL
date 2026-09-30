import {Project} from '../types/user.types'
import {query} from '../config/database'


export const createProject = async (appData: Project, userId:number): Promise<Project> => {
  const { name, description,  } = appData;
  
  const { rows } = await query(
    `INSERT INTO projects (name, description, created_by) VALUES ($1, $2, $3) RETURNING *`,
    [name, description,  userId]
  );
  
  return rows[0];
};

export const findAllProjects = async (): Promise<Project[]> => {
    const {rows} = await query(
        "SELECT * FROM projects ORDER BY created_at"

    );
    return rows
}


