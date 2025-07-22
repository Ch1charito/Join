import { Component } from '@angular/core';
import { AddTaskOverlayComponent } from '../add-task-overlay/add-task-overlay.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-board-top',
  imports: [AddTaskOverlayComponent, NgIf],
  templateUrl: './board-top.component.html',
  styleUrl: './board-top.component.scss',
})
export class BoardTopComponent {
  showAddTaskOverlay = false;

  openOverlay() {
    this.showAddTaskOverlay = true;
  }

  closeOverlay() {
    this.showAddTaskOverlay = false;
  }
}
