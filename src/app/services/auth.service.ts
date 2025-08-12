import { inject, Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, getAuth, signInAnonymously, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private router = inject(Router);

  constructor() { }

  signUp(email: string, password: string, username: string) {
    return createUserWithEmailAndPassword(this.firebaseAuth, email, password)
      .then(response => {
        return updateProfile(response.user, {
          displayName: username
        });
      });
  }

  login(email: string, password: string) {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise); // Promise in Observable umwandeln
  }

  // brauchen wir nicht wirklich lieber ein acc mit guest bei sign up erstellen und dann auf guest login button diesen acc einlogen?!
  guestLogin() {
    return signInAnonymously(this.firebaseAuth);
  }

  logout() {
    return this.firebaseAuth.signOut().then(() => {
      this.router.navigateByUrl('/');
    });
  }
  // um aktuellen eingeloggeden User zu sehen
  loggedInUsername(): string | null {
    return this.firebaseAuth.currentUser?.email || null;
  }
}
