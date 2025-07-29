import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TaskInterface } from '../../interfaces/task.interface';
import { FormsModule } from '@angular/forms';
import { AssignedToComponent } from "../../add-task/assigned-to/assigned-to.component";
import { PriorityComponent } from "../../add-task/priority/priority.component";
import { CategoryComponent } from "../../add-task/category/category.component";
import { SubtasksComponent } from "../../add-task/subtasks/subtasks.component";

@Component({
  selector: 'app-edit-card-overlay',
  imports: [FormsModule, AssignedToComponent, PriorityComponent, CategoryComponent, SubtasksComponent],
  templateUrl: './edit-card-overlay.component.html',
  styleUrl: './edit-card-overlay.component.scss'
})
export class EditCardOverlayComponent {
  firebaseService = inject(FirebaseService);
  @Input() editedTask!: TaskInterface;
  @Input() taskId!: string;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<TaskInterface>();
  

  onClose() {
    this.close.emit();
  }

  saveTask() {
    this.firebaseService.updateTaskInDatabase(this.taskId, this.editedTask);
    this.saved.emit(this.editedTask);
    this.onClose();
  }

}
