import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';

const routes = [
  { path: 'signin', component: SignInComponent },
  {
    path: '', component: HomeComponent, children: [
      { path: 'timeline', component: TimelineComponent },
      { path: 'actor/:id', component: ProfileComponent },
    ], canActivate: [AuthGuard],
  },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
