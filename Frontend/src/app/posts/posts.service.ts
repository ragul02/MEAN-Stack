import { Injectable } from '@angular/core';
import { Subject, observable } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();
    constructor(private http: HttpClient) { }
    getPosts() {
        this.http.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
        .pipe( map((postData) => {  // using pipe convert the objetc and store in new array
           return postData.posts.map( post =>{
              return{ title: post.title,
                content: post.content,
                id: post._id  // convert _id to id
              }
           });
        }))
        .subscribe((transformedPost) => {
            this.posts = transformedPost;
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
        this.http.post<{ message: string, postId:string }>('http://localhost:3000/api/posts', post)
            .subscribe(res => {
                const id = res.postId;
                post.id= id;
                console.log('response', res.message);
                this.posts.push(post);
                this.postUpdated.next([...this.posts]);
            });
    }


    deletePost(postId){
        this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe( res => {
            const postUpdates =  this.posts.filter(post => post.id !== postId);
            this.posts = postUpdates;
            this.postUpdated.next([...this.posts]);
console.log(res);
        });
    }
    // 0tbhVXHm3yJKF2h8
}

