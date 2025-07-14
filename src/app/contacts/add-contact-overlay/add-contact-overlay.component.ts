import { Component, inject, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact-overlay',
  imports: [FormsModule],
  templateUrl: './add-contact-overlay.component.html',
  styleUrl: './add-contact-overlay.component.scss'
})
export class AddContactOverlayComponent {
  @ViewChild('addContactForm') addContactForm!: NgForm;
  @Output() submitted = new EventEmitter<void>();
  firebaseService = inject(FirebaseService);
  contacts = {
    name: '',
    email: '',
    phone: ''
  };


  submitContact(form: NgForm) {
    if (!form.valid) {
      console.warn('Formular ungültig');
    return;
    }

    this.firebaseService.addContactToDatabase(this.contacts);
    form.resetForm()
    this.clearInputFields();
    this.submitted.emit();
    this.onCloseClick();
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
    this.addContactForm.resetForm();
    this.clearInputFields();
  }
  //#endregion
}  
