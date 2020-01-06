import { Component } from '@angular/core';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent {
    // post=[];
    posts = [{
        title: '1st title', content: 'first content'
    }, {
        title: '2nd title', content: 'second content'
    }, {
        title: '3rd title', content: 'third content'
    }]
}