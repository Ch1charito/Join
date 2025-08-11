import { Component } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-legal-notice',
  imports: [SideBarComponent, HeaderComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {

}
