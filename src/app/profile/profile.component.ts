import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OutboxService } from '../outbox.service';
import { Actor } from '../vocab/Actor';
import { switchMap } from 'rxjs';
import { OrderedCollectionPage } from '../vocab/Collection';
import { Activity } from '../vocab/Activity';
import { FollowService, FollowStatus } from '../follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  actor: Actor | undefined;
  host: string = '';
  activities: Activity[] = [];
  followStatus: FollowStatus = FollowStatus.NOT_FOLLOWER;

  constructor(
    private route: ActivatedRoute,
    private outboxService: OutboxService,
    private follow: FollowService
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
      this.outboxService.getOutboxPage(this.actor.identifier()).subscribe({
        next: (res) => {
          let outbox = new OrderedCollectionPage(res);
          if (!Array.isArray(outbox.orderedItems)) {
            this.activities.push(outbox.orderedItems as Activity);
          } else {
            outbox.orderedItems.forEach((o) => {
              this.activities.push(o as Activity);
            });
          }
        },
      });
    });
  }

  sendFollow() {
    if (this.actor?.id === undefined) {
      return
    }
    this.follow.sendFollowRequest(this.actor?.identifier()).subscribe({
      next: (res: any) => { this.followStatus = FollowStatus.FOLLOW_REQUEST_PENDING },
    })
  }
}
