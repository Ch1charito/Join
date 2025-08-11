import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-legal-notice-guest',
  imports: [RouterLink],
  templateUrl: './legal-notice-guest.component.html',
  styleUrl: './legal-notice-guest.component.scss'
})
export class LegalNoticeGuestComponent {

  constructor(private location: Location) {

    }

  goBack(): void {
    this.location.back();
  }
}
