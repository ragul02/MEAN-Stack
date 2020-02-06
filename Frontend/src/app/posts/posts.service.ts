import { Injectable } from '@angular/core';
import { Subject, observable } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient) { }
    getPosts() {
        this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts').subscribe((postData) => {
            this.posts = postData.posts;
            this.postUpdated.next([...this.posts]);
        });
    }

    getPostsUpdateListener() {
        return this.postUpdated.asObservable();
    }
    addPosts(title: string, content: string) {
        const post: Post = {
            id: null,
            // tslint:disable-next-line:object-literal-shorthand
            title: title,
            // tslint:disable-next-line:object-literal-shorthand
            content: content,
        };
        this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
            .subscribe(res => {
                console.log('response', res.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            });
    }
    // 0tbhVXHm3yJKF2h8
}

