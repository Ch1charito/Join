import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService);
  signupForm;
  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        policy: [false, [Validators.requiredTrue]],
  },
  {
    validators: [SignUpComponent.passwordsMatchValidator],
  }
);
  }
onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const { name, email } = this.signupForm.value;
    console.log('loogg...', { name, email, password: '...' });
  }

  static passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw && cpw && pw !== cpw ? { passwordsMismatch: true } : null;
  }

  //#region account auth
  //in submit prüfen ob passwörter über einstimmen --> wenn ja dann creat account und user feedback --> wenn nein dann user feedback daten prüfen
  createAccount(name: string, email: string, password: string) {
    this.authService.signUp(email, password, name)
      .then(() => {
        console.log('Account erfolgreich erstellt!');
      })
      .catch(error => {
        console.error('Fehler beim Erstellen des Accounts:', error);
      });
  }
  //#endregion
}

