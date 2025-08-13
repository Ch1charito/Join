import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-privacy-policy-guest',
  imports: [RouterLink],
  templateUrl: './privacy-policy-guest.component.html',
  styleUrl: './privacy-policy-guest.component.scss'
})
export class PrivacyPolicyGuestComponent {

  constructor(private location: Location) {

    }

  goBack(): void {
    this.location.back();
  }

}
