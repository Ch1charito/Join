import { Component } from '@angular/core';
import { AddTaskOverlayComponent } from '../add-task-overlay/add-task-overlay.component';
import { NgIf } from '@angular/common';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-board-top',
  imports: [AddTaskOverlayComponent, NgIf],
  templateUrl: './board-top.component.html',
  styleUrl: './board-top.component.scss',
})
export class BoardTopComponent {
    constructor(private searchService: SearchService) {}

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.searchService.setSearchTerm(value);
  }
  showAddTaskOverlay = false;

  openOverlay() {
    this.showAddTaskOverlay = true;
  }

  closeOverlay() {
    this.showAddTaskOverlay = false;
  }
}
