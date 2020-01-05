import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
    enteredValue = ""
    newPost = 'POST COnTENT';
    onAddPost(PostInput: HTMLInputElement) {
        this.newPost = this.enteredValue;
    }
}