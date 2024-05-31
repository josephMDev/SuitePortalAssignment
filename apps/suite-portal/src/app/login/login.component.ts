import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { jwtDecode } from 'jwt-decode';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'sp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
  });

  constructor(private authService: AuthService) {}

  login() {
      if (!this.loginForm.valid) {
          return;
      }
      if (this.loginForm.value.username && this.loginForm.value.password) {
          this.authService.login(
              this.loginForm.value.username,
              this.loginForm.value.password
          );
      }
  }
}
