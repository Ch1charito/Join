import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { EditCardOverlayComponent } from "../edit-card-overlay/edit-card-overlay.component";

@Component({
  selector: 'app-card-overlay',
  imports: [CommonModule, EditCardOverlayComponent],
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

  colors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];

  getInitials(name: string) {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  getColorForName(name: string): string {
  const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % this.colors.length;
  return this.colors[index];
}

  deleteTask() {
    this.firebaseService.deleteTaskFromDatabase(this.task.id!);
    this.onCloseClick();
  }

  //#region edit-task-overlay
  showEditTaskOverlay = false;

  selectedTask!: TaskInterface;

  openEditOverlay(task: TaskInterface) {
    this.selectedTask = task;
    this.showEditTaskOverlay = true;
  }

  closeEditOverlay() {
    this.showEditTaskOverlay = false;
  }
  //#endregion
}
