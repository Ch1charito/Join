import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email: string = '';
  password: string = '';

  onLogin(): void {
    if (!this.email || !this.password) {
      alert('Please enter your email and password.');
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigateByUrl('/summary');
      },
      error: (err) => {
        console.error(err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }

  guestLogIn(): void {
    this.authService.login('guestlogin@join.com', 'guest123').subscribe({
      next: () => {
        this.router.navigateByUrl('/summary');
      },
    });
  }
}
