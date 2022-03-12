import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthenticationService } from '../authentication.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  post: FormGroup;
  postInFlight: boolean = false;

  constructor(private fb: FormBuilder, private postService: PostService, private auth: AuthenticationService) {
    this.post = fb.group({
      content: ['', { validators: [Validators.required, Validators.maxLength(500), Validators.pattern(/[\S]/)] }]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.post.invalid) {
      return
    }
    this.postInFlight = true;
    let content: string = this.post.value['content'];
    content = content.trim();
    let username = this.auth.getUsername();
    let userID = new URL(`${environment.apiUrl}/actor/${username}`);
    let to: string = "https://www.w3.org/ns/activitystreams#Public";
    let cc: string = `${environment.apiUrl}/actor/${username}/followers`;
    this.postService.post(userID, username, content, to, cc).subscribe({
      next: (res) => {
        this.postInFlight = false;
        this.post.reset();
        this.post.controls['content'].setErrors(null)
        },
      error: (err) => {
        this.postInFlight = false;
      }
    });
  }

  prepareInput(content: string): string {
    let splitContent = content.split('\n')
    let newContent: string[] = [];
    splitContent.map((line: string) => {
      if (line === "") {
        return
      }
      newContent.push('<p>' + line + '</p>')
    });
    return newContent.join('\n')
  }

  getContentErrorMessage() {
    let content = this.post.controls['content'];
    if (content.getError('required')) {
      return 'Cannot submit an empty post';
    }
    if (content.getError('maxlength')) {
      return `${content.value.length} / 500`;
    }
    if (content.getError('pattern')) {
      return "Cannot submit an empty post";
    }
    return '';
  }
}
