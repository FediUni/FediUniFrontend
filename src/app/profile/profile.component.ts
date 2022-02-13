import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActorService } from '../actor.service';
import { Actor } from '../vocab/Actor';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  actor: Actor | undefined;
  host: string = '';

  constructor(private route: ActivatedRoute, private actorService: ActorService) { }

  ngOnInit(): void {
    let identifier = String(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(identifier).subscribe({
      next: (res) => {
        this.actor = new Actor(res);
      },
    });
  }

  determineHost(actorID: string) {
    let url = new URL(actorID);
    this.host = url.host
  }
}
