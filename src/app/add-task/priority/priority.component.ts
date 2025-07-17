import { Component } from '@angular/core';
// import {
//   PriorityOptionInterface,
//   PriorityKey,
// } from '../../interfaces/priority.interface';

@Component({
  selector: 'app-priority',
  imports: [],
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.scss',
})
export class PriorityComponent {
  selectedPriority: 'urgent' | 'medium' | 'low' | null = null;

  selectPriority(priority: 'urgent' | 'medium' | 'low') {
    if (this.selectedPriority === priority) {
      this.selectedPriority = null;
    } else {
      this.selectedPriority = priority;
    }
  }
}
// export class PriorityComponent {
//   @Input() options: PriorityOption[] = [];
//   @Input() selectedKey: PriorityKey | null = null;
//   @Output() selectedKeyChange = new EventEmitter<PriorityKey | null>();

//   selectPriority(key: PriorityKey) {
//     const newKey = this.selectedKey === key ? null : key;
//     this.selectedKey = newKey;
//     this.selectedKeyChange.emit(newKey);
//   }
// }
