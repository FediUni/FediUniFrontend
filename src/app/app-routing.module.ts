import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile/profile.component";
import {LoginComponent} from "./login/login.component";

const routes = [
  {path: "login", component: LoginComponent},
  {path: "actor/:id", component: ProfileComponent}
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
