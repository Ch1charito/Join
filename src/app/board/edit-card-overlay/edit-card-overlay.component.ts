import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { TaskInterface } from '../../interfaces/task.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-card-overlay',
  imports: [FormsModule],
  templateUrl: './edit-card-overlay.component.html',
  styleUrl: './edit-card-overlay.component.scss'
})
export class EditCardOverlayComponent {
  firebaseService = inject(FirebaseService);
  @Input() task!: TaskInterface;
  @Output() close = new EventEmitter<void>();
  

  onClose() {
    this.close.emit();
  }

  saveTask() {
    this.firebaseService.updateTaskInDatabase(this.task.id!, this.task);
    this.onClose();
  }

}
