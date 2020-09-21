import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User = null;
  public currentUserId: string = null;

  constructor(private http: HttpClient, private router: Router, private firestore: AngularFirestore,
              private fireauth: AngularFireAuth) {  }

  login(userId: string) {
    console.log('in authService');
    this.currentUserId = userId;
    this.firestore.doc<User>('users/' + userId).valueChanges()
      .subscribe(user => {
        this.currentUser = user;
        console.log(user);
        if (user) {
          this.router.navigateByUrl('/ads');
        }
      });
  }

  logout() {
    this.fireauth.signOut().then( res => {
      this.currentUser = null;
      this.currentUserId = null;
      this.router.navigateByUrl('/auth/login');
    });
  }
}
