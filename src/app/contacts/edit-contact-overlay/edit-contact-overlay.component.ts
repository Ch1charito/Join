import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-contact-overlay',
  imports:[FormsModule],
  templateUrl: './edit-contact-overlay.component.html',
  styleUrl: './edit-contact-overlay.component.scss',
  standalone: true,
})
export class EditContactOverlayComponent {
  @Input() name: string = '';
  @Input() email: string = '';
  @Input() phone: string = '';

  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
}
