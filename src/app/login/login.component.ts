import { Component, inject } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);




  // guest login ohne anonmyer login von auth service --> unkomplizierter --> einfach function auf button legen
  guestLogIn(): void{
    this.authService.login('guestlogin@join.com', 'guest123').subscribe({
      next: () => {
            this.router.navigateByUrl('/summary');
      },
    });
  }
}
