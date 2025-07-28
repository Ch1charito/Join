import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-card-overlay',
  imports: [],
  templateUrl: './card-overlay.component.html',
  styleUrl: './card-overlay.component.scss'
})
export class CardOverlayComponent {
  firebaseService = inject(FirebaseService);
  @Input() task!: TaskInterface;
  @Output() closeOverlay = new EventEmitter<void>();

  onCloseClick() {
    this.closeOverlay.emit();
  }

  deleteTask() {
    this.firebaseService.deleteTaskFromDatabase(this.task.id!);
    this.onCloseClick();
  }

}
