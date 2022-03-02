import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private postService: PostService, private auth: AuthenticationService) {
    this.post = fb.group({
      content: ['', Validators.maxLength(500)]
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    let content: string = this.post.value['content'];
    let username = this.auth.getUsername();
    let userID = new URL(`${environment.apiUrl}/actor/${username}`);
    let to: string = "https://www.w3.org/ns/activitystreams#Public";
    let cc: string = `${environment.apiUrl}/actor/${username}/followers`;
    this.postService.post(userID, username, content, to, cc).subscribe({
      next: (res) => { },
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
}