import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';
import { AngularFireStorage } from '@angular/fire/storage'
import { GlobalConstants } from '../../global-constants'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {

  data!: Post
  title!: string
  image?: string 
  content!: string
  alertdisable: boolean = true

  buttontext: string = "Create Post"
  displayImage?:any

  uploadPercent!: Observable<number | undefined>
  downloadUrl!: Observable<string>

  constructor(
    private auth:AuthService, 
    private postService: PostService,
    private afStorage: AngularFireStorage,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  createPost(){

    if(this.image == undefined)
    {
      this.image = ""
    }

    this.data = {
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorID: this.auth.getCurrentUserID(),
      content : this.content,
      image: this.image,
      createdOn: new Date(),
      title: this.title
    }
    console.log(this.data)
    this.postService.create(this.data)
    this.title = ""
    this.content = ""
    this.buttontext = "Post Created!"
    setTimeout(() => {
      this.buttontext ="Create Post"
      this.alertdisable = false
    }, 3000);
    this.alertdisable = true
  }

  uploadImage(event: any)
  {
    const file = event.target.files[0]
    const path = `Posts/${file.name}`
    if(file.type.split('/')[0] !== "image") {
      return alert("Please select an image file")
    }
    else
    {
      this.image = ""
      const fileref = this.afStorage.ref(path)
      const task = this.afStorage.upload(path, file)
      this.uploadPercent = task.percentageChanges()
      task.snapshotChanges().pipe(
        finalize(() => {
          fileref.getDownloadURL().subscribe((url) =>{ this.displayImage = url; })
        })
      )
      // task.snapshotChanges().pipe(
      //   finalize(()=>{
      //     fileref.getDownloadURL().subscribe((url) =>{ this.image = url; })
      //   })
      // )
      // console.log("Image Uploaded")
      
      // console.log("ImageUrl after subscribe " + this.displayImage)

      this.image = GlobalConstants.imageUrl + path  

      console.log(this.image)
      
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   var blob = xhr.response;
      // };
      // xhr.open('GET', this.image);
      // xhr.send();

      // // Or inserted into an <img> element
      // var img = document.getElementById('myimg');
      // img.setAttribute('src', this.image);// `url` is the download URL for 'images/stars.jpg'

      // // This can be downloaded directly:
      // var xhr = new XMLHttpRequest();
      // xhr.responseType = 'blob';
      // xhr.onload = (event) => {
      //   var blob = xhr.response;
      // };
      // xhr.open('GET', this.image);
      // xhr.send();

      // // Or inserted into an <img> element
      // var img = document.getElementById('myimg');
      // img.setAttribute('src', this.image);

      // console.log(this.image)
      // console.log(this.displayImage)
    }
  }

  //for creating a new post


}
