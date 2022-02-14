import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../actor.service';
import { OutboxService } from '../outbox.service';
import { Actor } from '../vocab/Actor';
import { OrderedCollection, OrderedCollectionPage } from '../vocab/Collection';
import { Activity } from '../vocab/Activity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  actor: Actor | undefined;
  host: string = '';
  activities: Activity[] = [];

  constructor(private route: ActivatedRoute, private actorService: ActorService, private outboxService: OutboxService) { }

  ngOnInit(): void {
    let identifier = String(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(identifier).subscribe({
      next: (res) => {
        this.actor = new Actor(res);
      },
    });
    this.outboxService.getOutboxPage(identifier).subscribe({
      next: (res) => {
        let outbox = new OrderedCollectionPage(res);
        outbox.orderedItems.forEach((o) => {
          this.activities.push(o as Activity);

        })
      }
    })
  }

  determineHost(actorID: string) {
    let url = new URL(actorID);
    this.host = url.host
  }
}
