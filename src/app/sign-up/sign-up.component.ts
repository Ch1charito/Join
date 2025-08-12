import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  submitted = false;
  private authService = inject(AuthService);
  namePattern = "^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,}$";
  passwordPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\w\\s]).{8,}$";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

  formData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    policy: false
  };
  

  onSubmit(form: NgForm) {
    this.submitted = true;
    const mismatch = this.formData.password !== this.formData.confirmPassword;
    if (form.invalid || mismatch) {
      form.form.markAllAsTouched();
      return;
    }
    console.log('Form submitted', this.formData);
    // later Firebase-Auth
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
