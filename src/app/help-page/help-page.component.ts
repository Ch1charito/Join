import { Component } from '@angular/core';
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { HeaderComponent } from "../shared/header/header.component";
import { Location, NgIf } from '@angular/common';


@Component({
  selector: 'app-help-page',
  imports: [SideBarComponent, HeaderComponent],
  templateUrl: './help-page.component.html',
  styleUrl: './help-page.component.scss'
})
export class HelpPageComponent {

  constructor(private location: Location) {

    }

  goBack(): void {
    this.location.back();
  }
}
