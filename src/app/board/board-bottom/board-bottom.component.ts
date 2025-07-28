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
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-board-bottom',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CardComponent, CardOverlayComponent, CommonModule, AddTaskOverlayComponent, NgIf],
  standalone: true,
  templateUrl: './board-bottom.component.html',
  styleUrl: './board-bottom.component.scss'
})
export class BoardBottomComponent implements OnInit {
  firebaseService = inject(FirebaseService);
  searchService = inject(SearchService);
  todo: TaskInterface[] = [];
  progress: TaskInterface[] = [];
  feedback: TaskInterface[] = [];
  done: TaskInterface[] = [];

  private allTasks: TaskInterface[] = [];


  ngOnInit() {
    this.loadTasks();
    this.searchService.searchTerm$.subscribe(term => {
      this.applyFilter(term);
    });
  }
  loadTasks() {
    setTimeout(() => {
      this.allTasks = this.firebaseService.taskList;
      this.filterTasksByStatus();
    }, 100);
  }
  filterTasksByStatus() {
    this.todo = this.allTasks.filter(task => task.status === 'todo');
    this.progress = this.allTasks.filter(task => task.status === 'progress');
    this.feedback = this.allTasks.filter(task => task.status === 'feedback');
    this.done = this.allTasks.filter(task => task.status === 'done');
  }
applyFilter(term: string) {
    if (!term) {
      this.filterTasksByStatus();
      return;
    }
    this.todo = this.allTasks.filter(t => t.status === 'todo' && this.matches(t, term));
    this.progress = this.allTasks.filter(t => t.status === 'progress' && this.matches(t, term));
    this.feedback = this.allTasks.filter(t => t.status === 'feedback' && this.matches(t, term));
    this.done = this.allTasks.filter(t => t.status === 'done' && this.matches(t, term));
  }
  matches(task: TaskInterface, term: string): boolean {
    return (
      task.title?.toLowerCase().includes(term) ||
      task.description?.toLowerCase().includes(term)
    );
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

  //#region card-overlay
  showCardOverlay = false;

  selectedTask!: TaskInterface;

  openCardOverlay(task: TaskInterface) {
    this.selectedTask = task;
    this.showCardOverlay = true;
  }

  closeCardOverlay() {
    this.showCardOverlay = false;
    this.loadTasks();
  }
  //#endregion
  
}
