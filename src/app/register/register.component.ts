import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private auth: AuthenticationService) {
    this.register = fb.group({
      'username': ['', [Validators.required, Validators.maxLength(12)]],
      'password': ['', [Validators.required, Validators.maxLength(25)]],
      'name': ['', [Validators.maxLength(25)]],
    });
  }

  ngOnInit(): void {
  }

  getUsernameErrorMessage() {
    if (this.register.controls['username'].getError('required')) {
      return 'Username is a required field';
    }
    if (this.register.controls['username'].getError('maxlength')) {
      return 'Username cannot exceed 12 characters';
    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.register.controls['password'].getError('required')) {
      return 'Password is a required field';
    }
    if (this.register.controls['password'].getError('maxlength')) {
      return 'Password cannot exceed 25 characters';
    }
    return '';
  }

  getNameErrorMessage() {
    if (this.register.controls['name'].getError('maxlength')) {
      return 'Name cannot exceed 25 characters';
    }
    return '';
  }

  onSubmit() {
    let username = this.register.value['username'];
    let password = this.register.value['password'];
    let name = this.register.value['name'];
    this.auth.register(username, password, name).subscribe({
      complete: () => this.router.navigate(['/'])
    })
  }
}
