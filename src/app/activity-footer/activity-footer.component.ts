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
  liked: Boolean = false;
  announced: Boolean = false;
  constructor(private post: PostService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.post.likeStatus(this.objectID || '').subscribe({
    next: (data: any) => this.liked = data.likeStatus as Boolean
    })
  }

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

  announce(): void {
    if (this.objectID === undefined || this.authorID === undefined) {
      return;
    }
    let username = this.auth.getUsername();
    let userID = new URL(`${environment.apiUrl}/actor/${username}`);
    let to = ["https://www.w3.org/ns/activitystreams#Public"]
    let cc = [
      this.authorID,
      `${environment.apiUrl}/actor/${username}/followers`,
    ]
    this.post.announce(userID, username, this.objectID, to, cc).subscribe({
      next: () => {
        this.announced = true;
      },
      error: () => {
        this.announced = false;
      },
    })
  }
}
