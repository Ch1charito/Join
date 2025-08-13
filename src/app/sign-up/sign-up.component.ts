import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup} from '@angular/forms';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { debounceTime} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  private authService = inject(AuthService);
  private router = inject(Router)

  private draftKey = 'signUpForm';

  signupForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  
  constructor(private fb: FormBuilder) {
    this.buildForm();
    this.restoreDraft();
    this.initAutosave();
  }

  private buildForm() {
    this.signupForm = this.fb.nonNullable.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required]],
        policy: [false, [Validators.requiredTrue]],
      }, {
        validators: [SignUpComponent.passwordsMatchValidator],
      });
    }
    
  private restoreDraft(){
    const saved = sessionStorage.getItem(this.draftKey);
    if (!saved) return;
      this.signupForm.patchValue(JSON.parse(saved), { emitEvent: false });
    }
  private initAutosave(){
      this.signupForm.valueChanges
      .pipe(debounceTime(150), takeUntilDestroyed())
      .subscribe(() => this.saveDraft());
  }
  private saveDraft() {
    const { name, email, policy } = this.signupForm.getRawValue();
    sessionStorage.setItem(this.draftKey, JSON.stringify({ name, email, policy }));
  }
  private clearDraft(){
    sessionStorage.removeItem(this.draftKey);
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }
    const { name, email } = this.signupForm.value;
    console.log('loogg...', { name, email, password: '...' });

    this.isSubmitting = true;
    this.signupForm.disable({ emitEvent: false });

    //  Overlay
    this.showSuccessMessage  = true;

    // Nach 1s zur Login-Page
    setTimeout(() => {
      this.goToLogin();
    }, 1500);
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
    this.signupForm.reset();
    this.isSubmitting = false;
    this.showSuccessMessage = false;
    this.clearDraft();
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