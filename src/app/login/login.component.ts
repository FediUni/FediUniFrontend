import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(
    fb: FormBuilder,
    private auth: AuthenticationService,
    private msg: MessageService,
    private router: Router
  ) {
    this.login = fb.group({
      username: ['', [Validators.required, Validators.max(12)]],
      password: ['', [Validators.required, Validators.max(25)]],
    });
  }

  ngOnInit(): void {}

  getUsernameErrorMessage() {
    if (this.login.controls['username'].getError('required')) {
      return 'Username is a required field';
    }
    if (this.login.controls['username'].getError('max')) {
      return 'Username cannot exceed 12 characters';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.login.controls['password'].getError('required')) {
      return 'Password is a required field';
    }
    if (this.login.controls['password'].getError('max')) {
      return 'Password cannot exceed 25 characters';
    }
    return '';
  }

  onSubmit() {
    let username = this.login.value['username'];
    let password = this.login.value['password'];
    this.auth.login(username, password).subscribe({
      complete: () => this.router.navigate(['/timeline']),
    });
  }
}
