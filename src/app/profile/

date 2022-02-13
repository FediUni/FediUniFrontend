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
  actor: Actor = new Actor();

  constructor(private route: ActivatedRoute, private actorService: ActorService) { }

  ngOnInit(): void {
    let actorID = String(this.route.snapshot.paramMap.get('id'));
    this.actorService.getActor(actorID).subscribe({
      next: (actor) => this.actor = actor,
    });
  }

}
