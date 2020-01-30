import { Injectable } from '@angular/core';
import { Subject, observable } from "rxjs";
import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    getPostsUpdateListener() {
        return this.postUpdated.asObservable();
    }
    addPosts(title: string, content: string) {
        const post: Post = {
           // tslint:disable-next-line:object-literal-shorthand
           title: title,
            // tslint:disable-next-line:object-literal-shorthand
            content: content,
        };
        this.posts.push(post);
        this.postUpdated.next([...this.posts]);
    }
}

