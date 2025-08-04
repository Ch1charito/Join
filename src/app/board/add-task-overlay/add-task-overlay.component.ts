import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  OnInit,
  inject
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PriorityComponent } from '../../add-task/priority/priority.component';
import { AssignedToComponent } from '../../add-task/assigned-to/assigned-to.component';
import { CategoryComponent } from '../../add-task/category/category.component';
import { SubtasksComponent } from '../../add-task/subtasks/subtasks.component';
import { AddTaskBtnOverlayComponent } from '../../add-task/add-task-btn-overlay/add-task-btn-overlay.component';

import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';

import { ContactInterface } from '../../interfaces/contact.interface';
import { TaskInterface } from '../../interfaces/task.interface';
import { PriorityKey } from '../../interfaces/priority.interface';

@Component({
  selector: 'app-add-task-overlay',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    PriorityComponent,
    AssignedToComponent,
    CategoryComponent,
    SubtasksComponent,
    AddTaskBtnOverlayComponent
  ],
  templateUrl: './add-task-overlay.component.html',
  styleUrl: './add-task-overlay.component.scss'
})
export class AddTaskOverlayComponent implements OnInit {
  @Input() status: string = 'todo';
  @Output() closeOverlay = new EventEmitter<void>();
  @Output() taskSubmitted = new EventEmitter<void>();

  @ViewChild(CategoryComponent) categoryComponent!: CategoryComponent;
  @ViewChild(SubtasksComponent) subtasksComponent!: SubtasksComponent;

  selectedAssignedContacts: ContactInterface[] = [];
  selectedPriority: PriorityKey | null = 'medium';
  showOverlay: boolean = false;
  taskAdded: boolean = false;
  router = inject(Router);
  firebaseService = inject(FirebaseService);

  tasks: TaskInterface = {
    title: '',
    description: '',
    date: '',
    priority: 'medium',
    assignedContacts: [],
    category: '',
    subtasks: [],
    status: 'todo',
  };

  minDate: string = new Date().toISOString().split('T')[0];

  ngOnInit() {
    this.tasks.status = this.status;
  }

  submitTask(form: NgForm) {
  if (!form.valid) {
    console.warn('Formular ungültig');
    return;
  }

  this.tasks.priority = this.selectedPriority ?? 'medium';
  this.tasks.assignedContacts = this.selectedAssignedContacts;
  this.firebaseService.addTaskToDatabase(this.tasks);

  this.showOverlay = true;
  setTimeout(() => {
    this.showOverlay = false;
    form.resetForm();
    this.clearInputFields();
    this.taskSubmitted.emit();
    this.close();              
  }, 1000);
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
    this.tasks.subtasks = subtasks.map(title => ({
      title: title,
      completed: false
    }));
  }

  close() {
    this.closeOverlay.emit();
  }
}
