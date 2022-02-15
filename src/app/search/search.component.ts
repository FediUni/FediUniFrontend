import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SearchService } from '../search.service'
import { Actor } from '../vocab/Actor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;

  constructor(private search: SearchService, private router: Router) {
    this.searchForm = new FormGroup({
      query: new FormControl('', []),
    });
  }

  ngOnInit(): void {}

  submit() {
    this.search.query(this.searchForm.value["query"]).subscribe({
      next: (next) => {
        let actor = new Actor(next);
        this.router.navigate([`/actor/${actor.identifier()}`]);
      },
    });
  }
}
