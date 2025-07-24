import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-task-btn-overlay',
  imports: [NgIf],
  templateUrl: './add-task-btn-overlay.component.html',
  styleUrl: './add-task-btn-overlay.component.scss',
})
export class AddTaskBtnOverlayComponent {
  @Input() showOverlay = false;
}
