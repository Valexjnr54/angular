import { Component,Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs'

import { Post } from '../post.model';
import { PostService } from '../post.service';
import { templateJitUrl } from '@angular/compiler';
import { importType, importExpr } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';


@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy  { 
    posts: Post[] = [];
    private postsub: Subscription;

    constructor(public postService: PostService){}

    ngOnInit(){
        this.posts = this.postService.getPost()
        this.postsub = this.postService.getPostUpdateListener()
        .subscribe((posts: Post[]) =>{
            this.posts =posts;
        });
    }

    ngOnDestroy(){
        this.postsub.unsubscribe();
    }
}