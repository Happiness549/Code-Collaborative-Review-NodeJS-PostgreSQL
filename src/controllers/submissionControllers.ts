import {Request, Response} from 'express'
import {createSubmissions, getSubmissionsByProject, getSubmissionById, updateSubmissionStatusById, deleteSubmissionById} from '../service/submissionService'
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


export const getProjectSubmissions = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Project ID is required in the URL parameters." });
        }

        const submissions = await getSubmissionsByProject(Number(id));

        
        return res.status(200).json({ submissions });
    } catch (error) {
        console.error("Get Project Submissions Error:", error);
        return res.status(500).json({ message: "Failed to retrieve submissions for this project." });
    }
};




export const getSingleSubmission = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ message: "Submission ID is required in URL path parameters." });
        }

        const submission = await getSubmissionById(Number(id));

        
        if (!submission) {
            return res.status(404).json({ message: `Submission with ID ${id} not found.` });
        }

        return res.status(200).json({ submission });
    } catch (error) {
        console.error("Get Single Submission Error:", error);
        return res.status(500).json({ message: "Failed to retrieve the submission." });
    }
};

export const updateSubmissionStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Submission ID is required in URL path parameters." });
        }

        if (!status) {
            return res.status(400).json({ message: "Status is required in the request body." });
        }

        const updatedSubmission = await updateSubmissionStatusById(Number(id), status);
        
        if (!updatedSubmission) {
            return res.status(404).json({ message: `Submission with ID ${id} not found.` });
        }

        return res.status(200).json({ submission: updatedSubmission });
    } catch (error) {
        console.error("Update Submission Status Error:", error);
        return res.status(500).json({ message: "Failed to update the submission status." });
    }
};



