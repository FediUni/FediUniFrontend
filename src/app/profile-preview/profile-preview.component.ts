import {Component, OnInit} from '@angular/core';
import { Actor } from "../vocab/Actor";
import {ActorService} from "../actor.service";

@Component({
  selector: 'app-profile-preview',
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss']
})
export class ProfilePreviewComponent implements OnInit {
  actor: Actor | undefined;

  constructor(private actorService: ActorService) { }

  ngOnInit(): void {
    this.actorService.getCurrentActor().subscribe({
      next: (res) => {
        this.actor = new Actor(res);
        console.log(this.actor);
      },
    })
  }
}
