import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Actor } from "../vocab/Actor";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  update: FormGroup;
  actor: Actor | undefined;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.actor = new Actor(res['actor'])
      this.update = this.fb.group({
        displayName: [this.actor.name, [Validators.maxLength(20)]],
        summary: [this.actor.summary, [Validators.maxLength(200)]],
      });
    })
  }

  ngOnInit(): void {
  }

  getDisplayNameError(): string {
    if (this.update.controls['displayName'].getError('maxlength')) {
      return 'Password cannot exceed 20 characters';
    }
    return '';
  }

  getSummaryError(): string {
    if (this.update.controls['summary'].getError('maxlength')) {
      return 'Password cannot exceed 200 characters';
    }
    return '';
  }
}
