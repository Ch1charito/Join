import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactInterface } from '../../interfaces/contact.interface';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-edit-contact-overlay',
  imports: [FormsModule],
  templateUrl: './edit-contact-overlay.component.html',
  styleUrl: './edit-contact-overlay.component.scss',
  standalone: true,
})
export class EditContactOverlayComponent {
  // @Input() name: string = '';
  // @Input() email: string = '';
  // @Input() phone: string = '';
  @Input() editedContact!: ContactInterface;
  @Input() contactId!: string | undefined;

  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<void>();
  firebaseService = inject(FirebaseService);

  isEdited = false;
  selectedContactIndex: number | null = null;

  onCloseClick() {
    this.close.emit();
  }

  saveEdit() {
  if (this.contactId) {
    this.firebaseService.updateContactInDatabase(this.contactId, this.editedContact);
  }
}

  cancelEdit() {
    this.isEdited = false;
    this.selectedContactIndex = null;
    this.contactId = '';
    this.onCloseClick();
  }

  deleteContact() {
    if (this.contactId) {
      this.firebaseService.deleteContactFromDatabase(this.contactId);
    }
    this.onCloseClick();
  }
}
