import { Injectable } from '@angular/core';
import {Post} from '../models/post.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  postsSubject = new Subject<Post[]>();

  constructor() {
    this.getPosts();
  }

  emitPosts() {
    this.postsSubject.next(this.posts);
  }

  savePosts() {
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts').on('value', (data) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    });
  }

  createNewPost(post: Post) {
    this.posts.push(post);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexRemove = this.posts.findIndex(
      (postElt) => {
        if (postElt === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  increaseLoveIts(i: number) {
    this.posts[i].love++;
    this.savePosts();
    this.emitPosts();
  }

  decreaseLoveIts(i: number) {
    this.posts[i].love--;
    this.savePosts();
    this.emitPosts();
  }
}
