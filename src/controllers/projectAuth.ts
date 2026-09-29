import { Request, Response } from "express";
import * as projectService from '../service/projectService'


export const addProject = async (req: Request, res: Response) => {
    try{
        const newApplication = await projectService.createProject(req.body, req.user!.id)
        res.status(201).json(newApplication)
    }catch(error){

        console.error("Controller Error:", error);
        res.status(500).json({message: "Error in creating a project"});

    }
};

export const getAllProjects = async (req: Request, res: Response) => {
    try{
        const projectss = await projectService.findAllProjects();
        res.status(200).json(projectss);
    }catch(error){
        res.status(500).json({message: "Error retrieving projects"});
    }
};