import { ContactInterface } from "./contact.interface";
import { PriorityKey } from "./priority.interface";

export interface TaskInterface{
    id?: string;
    title: string;
    description: string;
    date: string;
    priority: PriorityKey;
    assignedContacts: ContactInterface[];
    category: string;
    subtasks: { title: string; completed: boolean }[];
    status: string;
    order?: number;
}
