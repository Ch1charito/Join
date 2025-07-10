import { Component, inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [FormsModule],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss'
})
export class AddContactOverlayComponent {
  firebaseService = inject(FirebaseService);
  contacts = {
    name: '',
    email: '',
    phone: ''
  };

  submitContact() {
    this.firebaseService.addContactToDatabase(this.contacts);
    this.clearInputFields();
  }

  clearInputFields() {
    this.contacts.name = '';
    this.contacts.email = '';
    this.contacts.phone = '';
  }

 
  //#region overlay
  @Output() close = new EventEmitter<void>();

  onCloseClick() {
    this.close.emit();
  }
  //#endregion
}  
