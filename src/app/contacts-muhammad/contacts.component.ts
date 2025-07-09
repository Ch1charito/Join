import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { SideBarComponent } from '../shared/side-bar/side-bar.component';
import { AddContactOverlayComponent } from './add-contact-overlay/add-contact-overlay.component';
import { EditContactOverlayComponent } from './edit-contact-overlay/edit-contact-overlay.component';
import { Contact } from './../../app/interfaces/contact.interface';

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

  contacts: Contact[] = [
    {
      id: 1,
      name: 'Anton Mayer',
      email: 'anton.mayer@gmail.com',
      color: '#f44336',
    }, // red
    {
      id: 2,
      name: 'Anna Müller',
      email: 'anna.mueller@yahoo.de',
      color: '#e91e63',
    }, // pink
    {
      id: 3,
      name: 'Boris Becker',
      email: 'boris.becker@web.de',
      color: '#9c27b0',
    }, // lila
    {
      id: 4,
      name: 'Claudia Schmidt',
      email: 'claudia.schmidt@icloud.com',
      color: '#3f51b5',
    }, // blue
    {
      id: 5,
      name: 'David Wagner',
      email: 'david.wagner@outlook.de',
      color: '#2196f3',
    }, // lightblue
    {
      id: 6,
      name: 'Eva Fischer',
      email: 'eva.fischer@t-online.de',
      color: '#009688',
    }, // pink
    {
      id: 7,
      name: 'Frank Hoffmann',
      email: 'frank.hoffmann@gmx.de',
      color: '#4caf50',
    }, // green
    {
      id: 8,
      name: 'Gabriele Klein',
      email: 'gabriele.klein@yahoo.com',
      color: '#ff9800',
    }, // orange
    {
      id: 9,
      name: 'Holger Braun',
      email: 'holger.braun@mail.de',
      color: '#795548',
    }, // brown
    {
      id: 10,
      name: 'Isabel Neumann',
      email: 'isabel.neumann@web.de',
      color: '#607d8b',
    }, // grey
    {
      id: 11,
      name: 'Bob Neumann',
      email: 'Bob.neumann@web.de',
      color: '#607d8b',
    }, // grey
  ];
    Init(): void {
    this.contacts.sort((a, b) => a.name.localeCompare(b.name)); //sort name
  }
  getInitials(name: string) {
    return name
      .split(' ') //split name into words
      .map((part) => part.charAt(0)) //get first letter of each word("A", "M")
      .join('') //join letter together (AM)
      .toUpperCase(); //make all letters always uppercase
  }
}
