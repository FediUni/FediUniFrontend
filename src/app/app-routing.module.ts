import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { ActivityResolver } from "./activity.resolver";
import { FocusedActivityComponent } from './focused-activity/focused-activity.component';
import {ActorResolver} from "./actor.resolver";
import {SettingsComponent} from "./settings/settings.component";
import {CurrentActorResolver} from "./current-actor.resolver";

const routes = [
  { path: 'signin', component: SignInComponent },
  { path: '', redirectTo: 'timeline/personal', pathMatch: 'full' },
  {
    path: '', component: HomeComponent, children: [
      { path: 'timeline/:timeline', component: TimelineComponent },
      {
        path: 'actor/:identifier',
        component: ProfileComponent,
        resolve: {
          actor: ActorResolver,
        },
      },
      {
        path: 'activity',
        queryParams: { id: ":id"},
        component: FocusedActivityComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve: {
          actor: CurrentActorResolver,
        },
      },
    ], canActivate: [AuthGuard],
  },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
