import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AddContactOverlayComponent } from './add-contact-overlay/add-contact-overlay.component';
import { EditContactOverlayComponent } from './edit-contact-overlay/edit-contact-overlay.component';

@Component({
  selector: 'app-contacts',
  imports: [
    HeaderComponent,
    SideBarComponent,
    AddContactOverlayComponent,
    EditContactOverlayComponent,
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  // @ViewChild('addContact') private addContact!: AddContactOverlayComponent;
  showOverlay: boolean = false;

  openAddContact() {
    this.showOverlay = !this.showOverlay;
  }
}
