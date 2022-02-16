import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AuthGuard } from './auth.guard';

const routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'timeline', component: TimelineComponent, canActivate: [AuthGuard] },
  { path: 'actor/:id', component: ProfileComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
