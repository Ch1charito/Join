import { Component, inject } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { PriorityComponent } from "./priority/priority.component";
import { AssignedToComponent } from "./assigned-to/assigned-to.component";
import { CategoryComponent } from "./category/category.component";
import { SubtasksComponent } from "./subtasks/subtasks.component";
import { FirebaseService } from '../services/firebase.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  imports: [SideBarComponent, HeaderComponent, PriorityComponent, AssignedToComponent, CategoryComponent, SubtasksComponent, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  firebaseService = inject(FirebaseService);
  tasks = {
    title: '',
    description: '',
    date: ''
  };

  submitTask(form: NgForm) {
    if (!form.valid) {
      console.warn('Formular ungültig');
    return;
    }
    this.firebaseService.addTaskToDatabase(this.tasks);
    form.resetForm()
    this.clearInputFields();
  }

  clearInputFields() {
    this.tasks.title = '';
    this.tasks.description = '';
    this.tasks.date = '';
  }

}
