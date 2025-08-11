import { Component } from '@angular/core';
import { HeaderComponent } from "../shared/header/header.component";
import { SideBarComponent } from "../shared/side-bar/side-bar.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [HeaderComponent, SideBarComponent, RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

}
