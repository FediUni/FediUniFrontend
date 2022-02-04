import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "./profile/profile.component";
import { SignInComponent } from './sign-in/sign-in.component';

const routes = [
  { path: "signin", component: SignInComponent },
  { path: "actor/:id", component: ProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
