import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';

@Component({
  selector: 'app-add-task-overlay',
  imports: [AddTaskComponent],
  templateUrl: './add-task-overlay.component.html',
  styleUrl: './add-task-overlay.component.scss',
})
export class AddTaskOverlayComponent {
  @Input() status: string = 'todo';
  @Output() closeOverlay = new EventEmitter<void>();
  @Output() taskSubmitted = new EventEmitter<void>();
  close() {
    this.closeOverlay.emit();
  }
  onDelayedTaskSubmitted() {
  setTimeout(() => {
    this.taskSubmitted.emit();
  }, 1000);
}
}
