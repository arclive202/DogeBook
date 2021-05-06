import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null

  constructor(public afAuth: AngularFireAuth ) { 
    this.afAuth.authState.subscribe(data => this.authState = data)
  }


  getAuthenticated(): boolean
  {
    return this.authState != null
  }

  getCurrentUserID(): string
  {
    return this.getAuthenticated()? this.authState.uid : null
  }

  login() {
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  logout() {
    this.afAuth.signOut()
  }


}
