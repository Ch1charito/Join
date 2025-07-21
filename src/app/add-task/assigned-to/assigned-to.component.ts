import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
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
  @Output() selectedContactsChange = new EventEmitter<ContactInterface[]>();
  @Input() selectedAssignedContacts: ContactInterface[] = [];
  firebaseService = inject(FirebaseService);
  showContactDropdown: boolean = false;
  /* selectedAssignedContacts: ContactInterface[] = []; */

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

  //Diese Methode reagiert auf Klickereignisse überall im Dokument (document).
  @HostListener('document:click', ['$event'])
  // Holt eine Referenz auf das Hauptelement, das das Input-Feld und das Dropdown-Icon enthält.
  onDocumentClick(event: MouseEvent): void {
    const assignedDiv = document.getElementById('assignedDiv');
    // Holt eine Referenz auf das eigentliche Dropdown-Menü, das die Kontaktliste anzeigt
    const contactDropdown = document.getElementById('contactDropdown');

    // Prüft, ob die referenzierten Elemente existieren und ob der Klick
    // nicht auf das 'assignedDiv' (Input-Feld/Icon) und nicht auf das 'contactDropdown' selbst erfolgte.
    if (
      assignedDiv &&
      contactDropdown &&
      !assignedDiv.contains(event.target as Node) &&
      !contactDropdown.contains(event.target as Node)
    ) {
      // Wenn die Bedingungen erfüllt sind (Klick außerhalb relevanter Bereiche),
      // wird das Dropdown-Menü ausgeblendet.
      this.showContactDropdown = false;
    }
  }

  //prüft, ob ein übergebener Kontakt bereits in der Liste der ausgewählten Kontakte erhalten ist.
  isSelected(contact: ContactInterface): boolean {
    return this.selectedAssignedContacts.some((c) => c.id === contact.id);
  }

  //schaltet die Sichtbarkeit des Kontakt-Dropdown-Menüs um
  toggleContactDropdown(): void {
    this.showContactDropdown = !this.showContactDropdown;
  }

  //Auswählen und Abwählen von den Kontakten in der Kontaktliste
  selectContact(contact: ContactInterface): void {
    const index = this.selectedAssignedContacts.findIndex(
      (c) => c.id === contact.id
    );
    if (index === -1) {
      this.selectedAssignedContacts.push(contact);
    } else {
      this.selectedAssignedContacts.splice(index, 1);
    }
    this.selectedContactsChange.emit(this.selectedAssignedContacts);
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
