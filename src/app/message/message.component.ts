import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../message.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(private msg: MessageService, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    let config: MatSnackBarConfig = {
      duration: 500,
    }
    this.msg
    .onMessage()
    .subscribe((errorMessage) =>
      this._snackBar.open(errorMessage, 'Dismiss', config)
    );
  }
}
