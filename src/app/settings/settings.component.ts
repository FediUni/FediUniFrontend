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
  allowedTypes: String[] = ['image/jpeg', 'image/jpg', 'image/png'];
  update: FormGroup;
  actor: Actor | undefined;
  filename: String = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.data.subscribe((res) => {
      this.actor = new Actor(res['actor'])
      this.update = this.fb.group({
        profilePicture: [''],
        displayName: [this.actor.name, [Validators.maxLength(20)]],
        summary: [this.actor.summary, [Validators.maxLength(200)]],
      });
    })
  }

  ngOnInit(): void {
  }

  onFileChanged(event: any): void {
    let files: File[] = event?.target?.files || [];
    if (files?.length != 1) {
      return
    }
    const file: File = files[0];
    console.log(file);
    if (file) {
      let reader = new FileReader();
      let fileType = file?.type?.toLowerCase();
      if (!this.allowedTypes.includes(fileType)) {
        return
      }
      this.filename = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.update.setValue({
          profilePicture: reader.result,
        });
      };
    }
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
