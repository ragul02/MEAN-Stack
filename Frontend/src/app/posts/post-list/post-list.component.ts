import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    posts: Post[] = [];
    private postSub: Subscription;
    isLoading = false;
    totalPosts = 0;
    currentPage = 1;
    postPerPage = 2;
    pagesizeOptions = [1, 2, 5, 10]
    constructor(public postService: PostsService) {

    }
    ngOnInit() {
        this.postService.getPosts(this.postPerPage, this.currentPage);
        this.isLoading = true;
        this.postSub = this.postService.getPostsUpdateListener()
            .subscribe((postData: { posts: Post[], postsCount: number }) => {
                this.isLoading = false;
                this.totalPosts = postData.postsCount;
                this.posts = postData.posts;
            });
    }

    ngOnDestroy() {
        this.postSub.unsubscribe();
    }
    onChangedPage(pageData: PageEvent) {
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postPerPage = pageData.pageSize;
        this.postService.getPosts(this.postPerPage, this.currentPage);
    }
    deletePost(id: string) {
        this.postService.deletePost(id).subscribe(() => {
            this.postService.getPosts(this.postPerPage, this.currentPage);
        });
    }
}
