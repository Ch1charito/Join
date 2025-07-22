import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {Component} from '@angular/core';
import { CardComponent } from "../card/card.component";
import { CardOverlayComponent } from "../card-overlay/card-overlay.component";

@Component({
  selector: 'app-board-bottom',
  imports: [CdkDropList, CdkDrag, CdkDropListGroup, CardComponent, CardOverlayComponent],
  templateUrl: './board-bottom.component.html',
  styleUrl: './board-bottom.component.scss'
})
export class BoardBottomComponent {
  todo: string[] = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  progress: string[] = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  feedback: string[] = ['zu machen', 'lalala', 'banana'];
  done: string[] = [];
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
