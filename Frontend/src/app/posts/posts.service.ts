import { Injectable } from '@angular/core';
import { Subject, observable } from "rxjs";
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
@Injectable({ providedIn: 'root' })
export class PostsService {

    private posts: Post[] = [];
    private postUpdated = new Subject<{ posts: Post[], postsCount: number }>();
    constructor(private http: HttpClient, private router: Router) { }
    getPosts(pageSize: number, currentPage: number) {
        const queryParams = `?pageSize=${pageSize}&currentPage=${currentPage}`;
        this.http.get<{ message: string, posts: any, maxPosts: number }>('http://localhost:3000/api/posts' + queryParams)
            .pipe(map((postData) => {  // using pipe convert the objetc and store in new array
                return {
                    posts: postData.posts.map(post => {
                        return {
                            title: post.title,
                            content: post.content,
                            id: post._id,  // convert _id to id
                            imagePath: post.imagePath,
                            creator: post.creator
                        };
                    }), maxPosts: postData.maxPosts
                };
            }))
            .subscribe((transformedPostData) => {
                console.log('trq', transformedPostData);
                this.posts = transformedPostData.posts;
                this.postUpdated.next({
                    posts: [...this.posts],
                    postsCount: transformedPostData.maxPosts
                });
            });
    }

    getPostsUpdateListener() {
        return this.postUpdated.asObservable();
    }
    addPosts(title: string, content: string, image: File) {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);


        this.http.post<{ message: string, post: Post }>('http://localhost:3000/api/posts', postData)
            .subscribe(responseData => {
                this.router.navigate(['/']);
            });
    }


    deletePost(postId) {
        return this.http.delete('http://localhost:3000/api/posts/' + postId);
    }
    
    // 0tbhVXHm3yJKF2h8
    updatePost(id: string, title: string, content: string, image: File | string) {
        let postData: FormData | Post;
        if (typeof (image) === 'object') {
            postData = new FormData();
            postData.append('id', id);
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
                creator : null
            };
        }
        this.http.put('http://localhost:3000/api/posts/' + id, postData)
            .subscribe(res => {
                console.log(res);
                this.router.navigate(['/']);
            });
    }


    //Get post by id
    getPost(id: string) {
        return this.http.get<{ _id: string, title: string, content: string, imagePath: string, creator: string }>(
            'http://localhost:3000/api/posts/' + id);
    }

}

