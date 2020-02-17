import { Component, OnInit } from '@angular/core';
import { NgForm, Form, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from "../posts.service";
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
    enteredTitle = '';
    enteredContent = '';
    private mode = 'create';
    private postId: string;
    post: Post;
    isLoading = false;
    form: FormGroup;
    constructor(public postService: PostsService, public route: ActivatedRoute) { }

    ngOnInit() {
        //Reactive forms
        this.form = new FormGroup({
            title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
            content: new FormControl(null, {validators: [Validators.required]})
        });

        this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('postId')) {
                this.mode = 'edit';
                this.postId = paramMap.get('postId');
                this.isLoading = true;
                this.postService.getPost(this.postId).subscribe(post => {
                    this.isLoading = false;
                    this.post = { id: post._id, title: post.title, content: post.content };
                    this.form.setValue({
                        title: this.post.title,
                        content: this.post.content
                    });
                });
            } else {
                this.mode = 'create';
                this.postId = null;
            }
        });
    }
    onSavePost() {
        if (this.form.invalid) {
            return;
        }
        this.isLoading = true;
        if (this.mode === 'create') {
            this.postService.addPosts(this.form.value.title, this.form.value.content);
            this.isLoading = false;
        } else {
            this.postService.updatePost(this.postId,
                this.form.value.title,
                this.form.value.content);
            this.isLoading = false;

        }
        this.form.reset();
    }
}
