import { Component, OnInit, Input } from '@angular/core';
import {PostService} from "../post.service";
import {AuthenticationService} from "../authentication.service";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-activity-footer',
  templateUrl: './activity-footer.component.html',
  styleUrls: ['./activity-footer.component.scss'],
})
export class ActivityFooterComponent implements OnInit {
  @Input()
  objectID?: URL | string;
  @Input()
  authorID?: URL | string;
  liked: boolean = false;
  constructor(private post: PostService, private auth: AuthenticationService) { }

  ngOnInit(): void { }

  like(): void {
    if (this.objectID === undefined || this.authorID === undefined) {
      return;
    }
    let username = this.auth.getUsername();
    let userID = new URL(`${environment.apiUrl}/actor/${username}`);
    this.post.like(userID, username, this.objectID, this.authorID).subscribe({
      next: () => {
        this.liked = true;
      },
      error: () => {
       this.liked = false;
     },
    })
  }
}
