import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showOverlay = false;

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}
