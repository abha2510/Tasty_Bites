import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  isSignup: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.isSignup) {
      this.authService.signup(this.email, this.password, this.username)
        .subscribe(
          (response) => {
            // Signup successful, navigate to the login page with a success message
            this.router.navigate(['/login'], { queryParams: { signupSuccess: true } });
          },
          (error) => {
            // Signup failed, handle the error
            console.error(error);
            // Optionally, display an error message to the user
          }
        );
    } else {
      this.authService.login(this.email, this.password)
        .subscribe(
          (response) => {
            // Login successful, navigate to the home page or a private route
            this.router.navigate(['/home']);
          },
          (error) => {
            // Login failed, handle the error
            console.error(error);
            // Optionally, display an error message to the user
          }
        );
    }
  }

  toggleSignup() {
    this.isSignup = !this.isSignup;
  }
}
