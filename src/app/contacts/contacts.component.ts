import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AddContactOverlayComponent } from './add-contact-overlay/add-contact-overlay.component';
import { EditContactOverlayComponent } from './edit-contact-overlay/edit-contact-overlay.component';
import { ContactInterface } from './../../app/interfaces/contact.interface';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [
    HeaderComponent,
    SideBarComponent,
    AddContactOverlayComponent,
    EditContactOverlayComponent,
    FormsModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firebaseService = inject(FirebaseService);
  isEdited = false;
  selectedContactIndex: number | null = 0;
  contactId?: string = '';
  editedContact = {
    name: '',
    email: '',
    phone: '',
  };


  // add colors for initials
  colors = [
    '#FF7A00',
    '#FF5EB3',
    '#6E52FF',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B',
  ];

  // add initial contacts
  getInitials(name: string) {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }

  saveEditFromChild(updatedContact: ContactInterface) {
    if (this.contactId) {
      this.firebaseService.updateContactInDatabase(
        this.contactId,
        updatedContact
      );
    }
    this.cancelEdit();
  }


  editContact(index: number) {
    this.isEdited = true;
    this.selectedContactIndex = index;
    const contact = this.firebaseService.contactList[index];
    this.contactId = contact.id;
    this.editedContact = {
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    };
    this.showEditOverlay = true; // öffnet das Overlay
  }

  saveEdit() {
    if (this.contactId) {
      this.firebaseService.updateContactInDatabase(
        this.contactId,
        this.editedContact
      );
    }
    this.openEditContact();
  }

  cancelEdit() {
    this.isEdited = false;
    this.selectedContactIndex = null;
    this.contactId = '';
  }

  onSaveCompleted() {
    this.cancelEdit(); // schließt das Overlay und räumt auf
  }

  deleteContact(index: number) {
    this.contactId = this.firebaseService.contactList[index].id;
    if (this.contactId) {
      this.firebaseService.deleteContactFromDatabase(this.contactId);
    }
  }

  //#region Overlay
  showOverlay: boolean = false;
  showEditOverlay: boolean = false;
  showSelectedContact: boolean = false;
  animateContactInfo: boolean = false;
   animateAddOverlay: boolean = false;
  selectedContact: any;



  openSelectedContact(index: number) {
    this.animateContactInfo = false;

    this.selectedContact = this.firebaseService.contactList[index];
    this.showSelectedContact = true;

    setTimeout(() => {
      this.animateContactInfo = true;
    }, 50);
  }

   openAddContact() {
    this.showOverlay = !this.showOverlay;
    // Setze animateAddOverlay auf true nach einer kleinen Verzögerung beim Öffnen
    if (this.showOverlay) {
      this.animateAddOverlay = false; // Vor der Animation zurücksetzen
      setTimeout(() => {
        this.animateAddOverlay = true;
      }, 50);
    } else {
      this.animateAddOverlay = false; // Beim Schließen zurücksetzen
    }
  }

  openEditContact() {
    this.showEditOverlay = !this.showEditOverlay;
  }

  deleteSelectedContact() {
    if (this.selectedContact?.id) {
      this.firebaseService.deleteContactFromDatabase(this.selectedContact.id);
      this.showSelectedContact = false; // optional: schließt das Overlay
      this.selectedContact = null;
    }
  }
  //#endregion
}
