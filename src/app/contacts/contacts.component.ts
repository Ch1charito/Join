import { Component, inject, HostListener } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AddContactOverlayComponent } from './add-contact-overlay/add-contact-overlay.component';
import { EditContactOverlayComponent } from './edit-contact-overlay/edit-contact-overlay.component';
import { ContactInterface } from './../../app/interfaces/contact.interface';
import { FirebaseService } from '../services/firebase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacts',
  imports: [
    HeaderComponent,
    SideBarComponent,
    AddContactOverlayComponent,
    EditContactOverlayComponent,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  firebaseService = inject(FirebaseService);
  isEdited = false;
  selectedContactIndex: number | null = null;
  contactId?: string = '';
  editedContact = {
    name: '',
    email: '',
    phone: '',
  };
  showSuccessMessage: boolean = false;
  showDropdownMenu: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const dropdownMenu = document.getElementById('dropdown-menu');
    const editMobile = document.getElementById('edit-mobile');
    if (dropdownMenu && editMobile) {
      const clickedInsideDropdown = dropdownMenu.contains(event.target as Node);
      const clickedInsideEditMobile = editMobile.contains(event.target as Node);
      if (!clickedInsideDropdown && !clickedInsideEditMobile) {
        this.showDropdownMenu = false;
      }
    }
  }

  toggleDropdownMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showDropdownMenu = !this.showDropdownMenu;
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
    this.openEditContact();
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
    this.cancelEdit();
  }

  deleteContact(index: number) {
    this.contactId = this.firebaseService.contactList[index].id;
    if (this.contactId) {
      this.firebaseService.deleteContactFromDatabase(this.contactId);
    }
  }

  showContactCreatedMessage() {
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 2000);
  }

  //#region Overlay
  showOverlay: boolean = false;
  showEditOverlay: boolean = false;
  animateContactInfo: boolean = false;
  animateAddOverlay: boolean = false;
  selectedContact: any;
  animateEditOverlay: boolean = false;
  showSelectedContact: boolean = false;
  isDetailViewMobile: boolean = false;

  openSelectedContact(index: number) {
    if (this.selectedContactIndex === index && window.innerWidth >= 800) {
      this.showSelectedContact = false;
      this.selectedContactIndex = null;
      this.isDetailViewMobile = false;
    } else {
      this.animateContactInfo = false;
      this.selectedContact = this.firebaseService.contactList[index];
      this.selectedContactIndex = index;
      this.showSelectedContact = true;
      this.isDetailViewMobile = true;

      setTimeout(() => {
        this.showSelectedContact = true;
        this.animateContactInfo = true;
      }, 50);
    }
  }

  openAddContact() {
    this.showOverlay = !this.showOverlay;
    if (this.showOverlay) {
      this.animateAddOverlay = false;
      setTimeout(() => {
        this.animateAddOverlay = true;
      }, 50);
    } else {
      this.animateAddOverlay = false;
    }
  }

  openEditContact() {
    this.showEditOverlay = true;
    this.animateEditOverlay = false;
    setTimeout(() => {
      this.animateEditOverlay = true;
    }, 50);
  }

  closeEditContact() {
    this.animateEditOverlay = false;
    setTimeout(() => {
      this.showEditOverlay = false;
    }, 300);
  }

  deleteSelectedContact() {
    if (this.selectedContact?.id) {
      this.firebaseService.deleteContactFromDatabase(this.selectedContact.id);
      this.showSelectedContact = false;
      this.selectedContact = null;
    }
  }
  closeDetailView() {
    this.isDetailViewMobile = false;
  }

  //#endregion
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
}
