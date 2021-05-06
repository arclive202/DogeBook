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
  posts!: any
  CurrentUserdetails!:any
  idVal?:string
  constructor(
    private postService: PostService,
    public auth: AuthService ) { }

  ngOnInit(): void {
    this.posts = this.postService.getPosts()
    this.CurrentUserdetails = this.auth.getCurrentUserID()
  }

  delete(id: string | undefined)
  {
    this.idVal = id?.toString()
    this.postService.delete(this.idVal ?? "")
  }

  getDate(timestamp: any)
  {
    console.log(timestamp)
    return new Date(timestamp)
  }

}
