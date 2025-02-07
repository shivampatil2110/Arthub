import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Login Successful!', { email, password });
      this.authService.login(email, password).subscribe(
        (response) => {
          this.loading = false;
          console.log('Login successful!', response);
          // You can redirect the user or store the token here
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Login failed. Please try again.';
          console.error('Login error:', error);
        }
      )
    } else {
      console.log('Form is invalid');
    }
  }

}
