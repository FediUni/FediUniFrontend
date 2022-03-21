import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Actor } from "../vocab/Actor";
import {ActorService} from "../actor.service";

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
  profilePictureError: String = '';
  profilePicturePreview: any = '';

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private actorService: ActorService) {
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
    this.profilePictureError = '';
    let files: File[] = event?.target?.files || [];
    if (files?.length != 1) {
      return
    }
    const file: File = files[0];
    if (file) {
      let reader = new FileReader();
      let fileType = file?.type?.toLowerCase();
      if (!this.allowedTypes.includes(fileType)) {
        this.profilePictureError = 'Invalid file extension presented';
        return
      }
      this.filename = file.name;
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.update.controls['profilePicture'].patchValue(file);
        this.profilePicturePreview = e?.target?.result;
        this.profilePictureError = '';
      };
    }
  }

  submitUpdate(): void {
    let displayName: string = this.update.value['displayName'];
    let summary: string = this.update.value['summary'];
    let profilePicture: any = this.update.value['profilePicture'];
    if (this.update.invalid) {
      return
    }
    this.actorService.updateActor(displayName, summary, profilePicture).subscribe({
      complete: () => this.router.navigate(['']),
    });
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
