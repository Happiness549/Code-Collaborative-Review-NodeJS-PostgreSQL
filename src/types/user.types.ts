export type userRoles = 'Reviewer' | 'Submitter';

export interface User{
    id: number;
    email: string;
    name: string;
    password_hash: string;
    role: userRoles;
    created_at: Date;
}

export interface Project{
    id: number
    name: string;
    description: string
    createdBy: number;
    assignedMembers: number[];
}