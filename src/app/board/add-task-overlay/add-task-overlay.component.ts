import { Component, EventEmitter, Output } from '@angular/core';
import { AddTaskComponent } from '../../add-task/add-task.component';

@Component({
  selector: 'app-add-task-overlay',
  imports: [AddTaskComponent],
  templateUrl: './add-task-overlay.component.html',
  styleUrl: './add-task-overlay.component.scss',
})
export class AddTaskOverlayComponent {
  @Output() closeOverlay = new EventEmitter<void>();
  close() {
    this.closeOverlay.emit();
  }
}
