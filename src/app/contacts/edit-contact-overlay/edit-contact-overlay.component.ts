import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-contact-overlay',
  imports: [],
  templateUrl: './edit-contact-overlay.component.html',
  styleUrl: './edit-contact-overlay.component.scss'
})
export class EditContactOverlayComponent {

  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
}
