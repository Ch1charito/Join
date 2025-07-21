import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PriorityKey } from '../../interfaces/priority.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority',
  imports: [CommonModule],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
})
export class PriorityComponent {
  @Input() selectedPriority: PriorityKey | null = null;
  @Output() selectedPriorityChange = new EventEmitter<PriorityKey | null>();

  selectPriority(priority: PriorityKey) {
    //toggle
    this.selectedPriority =
      this.selectedPriority === priority ? null : priority;
    //emmit the change to parent component
    this.selectedPriorityChange.emit(this.selectedPriority);
  }
}
