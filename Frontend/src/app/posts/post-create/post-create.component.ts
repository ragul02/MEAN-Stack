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
    imagePreview: string;
    constructor(public postService: PostsService, public route: ActivatedRoute) { }

    ngOnInit() {
        //Reactive forms
        this.form = new FormGroup({
            title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
            content: new FormControl(null, { validators: [Validators.required] }),
            image: new FormControl(null, { validators: [Validators.required] })
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

    onImagePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        // setvalue  set value of all input controls, patch value allows you to target a single control
        this.form.get('image').updateValueAndValidity();
        //  This basically informs Angular that I changed the value and it should re-evaluate that,
        //  store that value internally and also check whether the value I did patch is valid
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
        console.log('this.form', this.form);
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
