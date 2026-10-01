import {Request, Response} from 'express'
import {createSubmissions} from '../service/submissionService'
import * as submissionService from '../service/submissionService'




export const Submission = async (req: Request, res: Response) => {
    try {
        
        const { projectId, title, code, fileName } = req.body;

        if (!projectId || !title || !code || !fileName) {
             console.log("Validation Failed. Received body:", req.body); 
             return res.status(400).json({ message: "Missing required fields: projectId, title, code, fileName are required." });
        }
        const submission = await createSubmissions(Number(projectId), { title, code, fileName, status: 'Pending' });

        return res.status(201).json({ message: "Submission created successfully", submission });
    } catch (error) {
        console.error("Submission Error:", error); 
        return res.status(500).json({ message: "Failed to create submission" });
    }
};

