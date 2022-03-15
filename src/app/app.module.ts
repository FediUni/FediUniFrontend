import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxJdenticonModule } from 'ngx-jdenticon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { TimelineComponent } from './timeline/timeline.component';
import { NoteComponent } from './note/note.component';
import { httpInterceptorProviders } from './interceptors';
import { MessageComponent } from './message/message.component';
import { ActivityHeaderComponent } from './activity-header/activity-header.component';
import { ActivityComponent } from './activity/activity.component';
import { ActivityFooterComponent } from './activity-footer/activity-footer.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { VideoComponent } from './video/video.component';
import { FocusedActivityComponent } from './focused-activity/focused-activity.component';
import { NavigationListComponent } from './navigation-list/navigation-list.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    SignInComponent,
    TimelineComponent,
    NoteComponent,
    MessageComponent,
    ActivityHeaderComponent,
    ActivityComponent,
    ActivityFooterComponent,
    SearchComponent,
    SearchResultsComponent,
    HomeComponent,
    CreatePostComponent,
    VideoComponent,
    FocusedActivityComponent,
    NavigationListComponent,
    ProfilePreviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatTooltipModule,
    NgxJdenticonModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule { }
