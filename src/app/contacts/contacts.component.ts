import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";

@Component({
  selector: 'app-contacts',
  imports: [HeaderComponent, SideBarComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {

}
