import { ContactInterface } from "./contact.interface";

export interface TaskInterface{
    id?: string;
    title: string;
    description: string;
    date: string;
    priority: string;
    assignedContacts: ContactInterface[];
    category: string;
    subtasks: string[];
}
