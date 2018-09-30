import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostsService} from '../services/posts.service';
import {Post} from '../models/post.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit, OnDestroy {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsSubscription = this.postsService.postsSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPosts();
  }

  onIncreaseLoveIt(i: number) {
    this.postsService.increaseLoveIts(i);
  }

  onDecreaseLoveIt(i: number) {
    this.postsService.decreaseLoveIts(i);
  }

  onDeletePost(post: Post) {
    this.postsService.removePost(post);
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe();
  }

  getColorLoveIt(loveIt) {
    if (loveIt > 0) {
      return 'green';
    } else if (loveIt < 0) {
      return 'red';
    }
  }
}
