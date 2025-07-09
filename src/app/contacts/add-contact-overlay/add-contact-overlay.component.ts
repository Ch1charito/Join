import { Component } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss'
})
export class AddContactOverlayComponent {
 
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
}  
