import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { Observable } from 'rxjs'
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post'
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts!: Observable<Post[]>
  CurrentUserdetails!:any
  constructor(
    private postService: PostService,
    private auth: AuthService ) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.CurrentUserdetails = this.auth.getCurrentUserID()
    
    // console.log()
  }

  delete(id: string)
  {
    this.postService.delete(id)
  }

  getDate(timestamp: any)
  {
    console.log(timestamp)
    return new Date(timestamp)
  }

}