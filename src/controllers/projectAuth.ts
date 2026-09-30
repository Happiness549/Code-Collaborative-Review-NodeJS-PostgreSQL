import { Request, Response } from "express";
import * as projectService from '../service/projectService'
import { query } from "../config/database";

import { Pool } from "pg";


export const addProject = async (req: Request, res: Response) => {
    try{
        const project = await projectService.createProject(req.body, req.user!.id)
        res.status(201).json(project)
    }catch(error){

        console.error("Controller Error:", error);
        res.status(500).json({message: "Error in creating a project"});

    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try{
        const projects = await projectService.findAllProjects();
        res.status(200).json(projects);
    }catch(error){
        console.error("Error Error:", error);
        res.status(500).json({message: "Error retrieving projects"});
    }
};

export const assignUserToProject = async (req: Request, res: Response) =>{
    try{
        const {id} = req.params;
        const {userId} = req.body;

        const result = await query(`INSERT INTO project_members (project_id, user_id) VALUES ($1,$2) RETURNING *`,
            [id, userId]
        );
        res.status(201).json({message: "User assigned to project successfully",
            member: result.rows[0]
        });
    }catch(error){
         console.error("Error Error:", error);
        res.status(500).json({message: "Failed to assign user to project"});
    }
};

export const removeUserFromProject = async (req: Request, res: Response) => {
    try{
        const {id, userId} = req.params;
        const result = await query(`DELETE FROM project_members WHERE project_id = $1 AND  user_id = $2 RETURNING *`,
            [id, userId]
        );
        if(result.rows.length === 0 ){
            return res.status(404).json({message: "User is not a member of this project"});
        } 

        }catch (error){
             console.error("Error Error:", error);
            res.status(500).json({message: "Failed to remove user from project"});
    }
};