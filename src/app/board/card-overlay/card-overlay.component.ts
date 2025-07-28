import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskInterface } from '../../interfaces/task.interface';

@Component({
  selector: 'app-card-overlay',
  imports: [],
  templateUrl: './card-overlay.component.html',
  styleUrl: './card-overlay.component.scss'
})
export class CardOverlayComponent {
  @Input() task!: TaskInterface;
  @Output() closeOverlay = new EventEmitter<void>();

  onCloseClick() {
    this.closeOverlay.emit();
  }

}
