import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  actorID: string = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.actorID = String(this.route.snapshot.paramMap.get('id'));
  }

}
