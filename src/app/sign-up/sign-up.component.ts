import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  private router = inject(Router);

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

    const { name, email, password } = this.signupForm.value as { name: string; email: string; password: string };

    this.authService.signUp(email, password, name)
      .then(() => {
        const contactsRef = collection(this.firestore, 'contacts');
        return addDoc(contactsRef, { name, email, phone: '' });
      })
      .then(() => {
        this.router.navigateByUrl('/login');
      })
      .catch(error => {
        console.error('Fehler beim SignUp:', error);
      });
  }

  static passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pw = group.get('password')?.value;
    const cpw = group.get('confirmPassword')?.value;
    return pw && cpw && pw !== cpw ? { passwordsMismatch: true } : null;
  }
}
