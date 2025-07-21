
import { Component, inject, ViewChild } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { PriorityComponent } from "./priority/priority.component";
import { AssignedToComponent } from "./assigned-to/assigned-to.component";
import { CategoryComponent } from "./category/category.component";
import { SubtasksComponent } from "./subtasks/subtasks.component";
import { FirebaseService } from '../services/firebase.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PriorityKey } from '../interfaces/priority.interface';
import { ContactInterface } from '../interfaces/contact.interface';
import { TaskInterface } from '../interfaces/task.interface';

@Component({
  selector: 'app-add-task',
  imports: [SideBarComponent, HeaderComponent, PriorityComponent, AssignedToComponent, CategoryComponent, SubtasksComponent, FormsModule],

  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;
  @ViewChild(SubtasksComponent) subtasksComponent!: SubtasksComponent;
  selectedAssignedContacts: ContactInterface[] = [];

  selectedPriority: PriorityKey | null = 'medium';
  saveTask() {
    console.log('Priorität:', this.selectedPriority);
  }

  firebaseService = inject(FirebaseService);
  tasks: TaskInterface = {
    title: '',
    description: '',
    date: '',
    priority: '',
    assignedContacts: [],
    category: '',
    subtasks: [],
  };

  submitTask(form: NgForm) {
    if (!form.valid) {
      console.warn('Formular ungültig');
    return;
    }
    this.tasks.priority = this.selectedPriority ?? '';
    this.tasks.assignedContacts = this.selectedAssignedContacts;
    this.firebaseService.addTaskToDatabase(this.tasks);
    form.resetForm()
    this.clearInputFields();
  }

  clearInputFields() {
    this.tasks.title = '';
    this.tasks.description = '';
    this.tasks.date = '';
    this.selectedPriority = 'medium';
    this.selectedAssignedContacts = [];
    this.categoryComponent.resetCategory();
    this.subtasksComponent.resetSubtasks();
  }

  onAssignedContactsChange(contacts: ContactInterface[]) {
    this.selectedAssignedContacts = contacts;
  }
  onCategoryChange(category: string) {
    this.tasks.category = category;
  }


  handleSubtasksChange(subtasks: string[]) {
    console.log('Daten für Robin', subtasks);
    this.tasks.subtasks = subtasks;  
  }
}
