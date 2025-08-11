import { Component } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-privacy-policy',
  imports: [SideBarComponent, HeaderComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
