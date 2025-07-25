import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component, inject, OnInit} from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CommonModule } from '@angular/common';
import { CardOverlayComponent } from "../card-overlay/card-overlay.component";
import { TaskInterface } from '../../interfaces/task.interface';
import { FirebaseService } from '../../services/firebase.service';
import { AddTaskOverlayComponent } from "../add-task-overlay/add-task-overlay.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-board-bottom',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CardComponent, CardOverlayComponent, CommonModule, AddTaskOverlayComponent, NgIf],
  standalone: true,
  templateUrl: './board-bottom.component.html',
  styleUrl: './board-bottom.component.scss'
})
export class BoardBottomComponent implements OnInit {
  firebaseService = inject(FirebaseService);
  todo: TaskInterface[] = [];
  progress: TaskInterface[] = [];
  feedback: TaskInterface[] = [];
  done: TaskInterface[] = [];

  ngOnInit() {
    this.filterTasksByStatus();
  }

  filterTasksByStatus() {
    setTimeout(() => {
      this.todo = this.firebaseService.taskList.filter(task => task.status === 'todo');
      this.progress = this.firebaseService.taskList.filter(task => task.status === 'progress');
      this.feedback = this.firebaseService.taskList.filter(task => task.status === 'feedback');
      this.done = this.firebaseService.taskList.filter(task => task.status === 'done');
    }, 100); 
  }

  trackById(index: number, item: TaskInterface): string {
  return item.id!;
}

  drop(event: CdkDragDrop<TaskInterface[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  } else {
    const movedTask = event.previousContainer.data[event.previousIndex];
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    let newStatus = '';
    switch (event.container.id) {
      case 'todoList': newStatus = 'todo'; break;
      case 'progressList': newStatus = 'progress'; break;
      case 'feedbackList': newStatus = 'feedback'; break;
      case 'doneList': newStatus = 'done'; break;
    }
    movedTask.status = newStatus;
    this.firebaseService.updateTaskInDatabase(movedTask.id!, movedTask);
    this.filterTasksByStatus();
    }
  }
  //#region add-task-overlay
  showAddTaskOverlay = false;

  currentStatus: string = 'todo'; // Standardwert

  openOverlay(status: string) {
    this.currentStatus = status;
    this.showAddTaskOverlay = true;
  }

  closeOverlay() {
    this.showAddTaskOverlay = false;
  }
  //#endregion

}
