import { Component } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-legal-notice',
  imports: [SideBarComponent, HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

  constructor(private location: Location) {

    }

  goBack(): void {
    this.location.back();
  }
}
