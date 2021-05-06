import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router'
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  post!: any
  formData!: Post
  buttontext: string = "Update Post"
  editing: boolean = false
  constructor(
    private route:ActivatedRoute,
    private postService: PostService,
    public auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPost()
    console.log(this)
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id')
    return this.postService.getPostData(id ?? "").subscribe(data => this.post = data)
    
  }

  updatePost() {
    this.formData = {
      title: this.post.title,
      content: this.post.content,
      author: this.post.author,
      authorID: this.post.authorID,
      createdOn: this.post.createdOn
    }
    console.log(this.post.title)
    console.log(this.post.content)
    const id = this.route.snapshot.paramMap.get('id') ?? ""
    this.postService.update(id, this.formData)
    this.editing = false
  }

  delete()
  {
    const id = this.route.snapshot.paramMap.get('id')
    this.postService.delete(id ?? "")
    this.router.navigate(["/blog"])

  }

}
