export interface Task {
    id?: string;    
    title: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
    completed: boolean;
    userId: string;
    favorite: boolean; 
}