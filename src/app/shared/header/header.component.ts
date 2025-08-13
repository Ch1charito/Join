import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  showOverlay = false;
  initials: string = '';
  private authService = inject(AuthService);
  private firebaseService = inject(FirebaseService);

  ngOnInit() {
    const email = this.authService.loggedInUsername();

    if (email) {
      const contact = this.firebaseService.contactList
        .find(c => c.email.toLowerCase() === email.toLowerCase());

      let displayName = email;
      if (contact && contact.name) {
        displayName = contact.name;
      }

      this.initials = this.extractInitials(displayName);
    }
  }

  private extractInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
  }

  toggleOverlay() {
    this.showOverlay = !this.showOverlay;
  }
}