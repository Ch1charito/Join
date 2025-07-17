import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../services/firebase.service';
import { ContactInterface } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-assigned-to',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assigned-to.component.html',
  styleUrls: ['./assigned-to.component.scss'],
})
export class AssignedToComponent {
  firebaseService = inject(FirebaseService);
  showContactDropdown: boolean = false;
  selectedAssignedContacts: ContactInterface[] = [];

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const assignedDiv = document.getElementById('assignedDiv');
    const contactDropdown = document.getElementById('contactDropdown');

    if (
      assignedDiv &&
      contactDropdown &&
      !assignedDiv.contains(event.target as Node) &&
      !contactDropdown.contains(event.target as Node)
    ) {
      this.showContactDropdown = false;
    }
  }

  toggleContactDropdown(): void {
    this.showContactDropdown = !this.showContactDropdown;
  }

  selectContact(contact: ContactInterface): void {
    const index = this.selectedAssignedContacts.findIndex(
      (c) => c.id === contact.id
    );
    if (index === -1) {
      this.selectedAssignedContacts.push(contact);
    } else {
      this.selectedAssignedContacts.splice(index, 1);
    }

    this.showContactDropdown = false;
    console.log('Selected contacts:', this.selectedAssignedContacts);
  }

  getInitials(name: string): string {
    if (!name) return '';
    return name
      .split(' ')
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
  }
}
