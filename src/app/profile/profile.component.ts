import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutboxService } from '../outbox.service';
import { Actor } from '../vocab/Actor';
import { OrderedCollectionPage } from '../vocab/Collection';
import { Activity } from '../vocab/Activity';
import { FollowService, FollowStatus } from '../follow.service';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  actor: Actor | undefined;
  activities: Activity[] = [];
  seenActivities: Map<string, boolean> = new Map<string, boolean>();
  followStatus: FollowStatus = FollowStatus.NOT_FOLLOWER;
  loadingOutbox: boolean = false;
  currentIdentifier: string = '';
  currentPage: number = 0;

  constructor(
    private route: ActivatedRoute,
    private outboxService: OutboxService,
    private follow: FollowService,
    private auth: AuthenticationService,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe((res) => {
      this.actor = new Actor(res['actor'])
      this.follow.followerStatus(this.actor?.identifier()).subscribe({
        next: (res: any) => {
          this.followStatus = res.followerStatus as FollowStatus;
        }
      })
      this.loadingOutbox = true;
      this.outboxService.getOutboxPage(this.actor.identifier(), this.currentPage).subscribe({
        next: (res) => {
          let outbox = new OrderedCollectionPage(res);
          if (!Array.isArray(outbox.orderedItems)) {
            this.seenActivities.set(outbox.orderedItems.id as string, true);
            this.activities.push(outbox.orderedItems as Activity)
          } else if (outbox?.orderedItems !== undefined) {
            outbox.orderedItems.forEach((o) => {
              if (!this.seenActivities.has(o.id as string)) {
                this.seenActivities.set(o.id as string, true);
                this.activities.push(o as Activity);
              }
            });
          }
          this.loadingOutbox = false;
        },
        error: () => this.loadingOutbox = false,
      });
    });
    this.currentIdentifier = this.auth.getIdentifier();
  }

  sendFollow() {
    if (this.actor?.id === undefined) {
      return
    }
    this.follow.sendFollowRequest(this.actor?.identifier()).subscribe({
      next: (res: any) => { this.followStatus = FollowStatus.FOLLOW_REQUEST_PENDING },
    })
  }

  nextPage() {
    if (this.actor?.id === undefined) {
      return
    }
    this.currentPage++;
    this.outboxService.getOutboxPage(this.actor.identifier(), this.currentPage).subscribe({
      next: (res) => {
        let outbox = new OrderedCollectionPage(res);
        if (!Array.isArray(outbox.orderedItems)) {
          this.seenActivities.set(outbox.orderedItems.id as string, true);
          this.activities.push(outbox.orderedItems as Activity)
        } else if (outbox?.orderedItems !== undefined) {
          outbox.orderedItems.forEach((o) => {
            if (!this.seenActivities.has(o.id as string)) {
              this.seenActivities.set(o.id as string, true);
              this.activities.push(o as Activity);
            }
          });
        }
      },
    });
  }
}
