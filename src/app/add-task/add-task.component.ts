import { Component } from '@angular/core';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { HeaderComponent } from '../shared/header/header.component';
import { PriorityComponent } from './priority/priority.component';
import { AssignedToComponent } from './assigned-to/assigned-to.component';
import { CategoryComponent } from './category/category.component';
import { SubtasksComponent } from './subtasks/subtasks.component';
import { PriorityKey } from '../interfaces/priority.interface';

@Component({
  selector: 'app-add-task',
  imports: [
    SideBarComponent,
    HeaderComponent,
    PriorityComponent,
    AssignedToComponent,
    CategoryComponent,
    SubtasksComponent,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  selectedPriority: PriorityKey | null = 'medium';
  saveTask() {
    console.log('Priorität:', this.selectedPriority);
  }
}
