import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card-overlay',
  imports: [],
  templateUrl: './card-overlay.component.html',
  styleUrl: './card-overlay.component.scss'
})
export class CardOverlayComponent {
  @Output() closeOverlay = new EventEmitter<void>();

  onCloseClick() {
    this.closeOverlay.emit();
  }

}
