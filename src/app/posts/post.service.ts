import { Injectable } from '@angular/core';
import { 
  AngularFirestore, 
  AngularFirestoreCollection, 
  AngularFirestoreDocument } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>
  postDoc!: AngularFirestoreDocument<Post>
  constructor(private afs: AngularFirestore) { 
    this.postsCollection = this.afs.collection('Posts', ref => ref.orderBy('createdOn','desc'))
  }


  getPosts()
  {
    return this.postsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post
        const id = a.payload.doc.id
        return {id,...data}
      })
    }))
  }

  getPostData(id: string)
  {
    this.postDoc = this.afs.doc<Post>(`Posts/${id}`)
    return this.postDoc.valueChanges() ?? null
  }

  create(data: Post)
  {
    this.postsCollection.add(data)
  }

  getPost(id: string)
  {
    return this.afs.doc<Post>(`Posts/${id}`)    
  }

  delete(id: string)
  {
    return this.getPost(id).delete()
  }

  update(id: string, formData: Post)
  {
    return this.getPost(id).update(formData)
  }

}

//need to define a class to hold the data for our post
