import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../authentication.service";

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss']
})
export class NavigationListComponent implements OnInit {
  identifier: String = '';
  constructor(private auth: AuthenticationService) {
    this.identifier = this.auth.getIdentifier();
  }

  ngOnInit(): void {
  }

}
