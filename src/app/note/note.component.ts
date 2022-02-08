import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../vocab/Note';
import { Actor } from '../vocab/Actor';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note = new Note();
  @Input() author: Actor = new Actor();

  constructor() {
  }

  ngOnInit(): void {
  }

}
