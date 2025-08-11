import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  submitted = false;
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
}
