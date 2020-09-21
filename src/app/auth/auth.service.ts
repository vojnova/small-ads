import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {NzMessageService} from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User = null;
  public currentUserId: string = null;

  constructor(private http: HttpClient, private router: Router, private firestore: AngularFirestore,
              private fireauth: AngularFireAuth, private message: NzMessageService) {  }

  login(userId: string) {
    this.currentUserId = userId;
    this.firestore.doc<User>('users/' + userId).valueChanges()
      .subscribe(user => {
        this.currentUser = user;
        if (user) {
          this.message.success('Влязохте успешно!');
          this.router.navigateByUrl('/ads');
        }
        else {
          this.message.error('Неуспешен вход!');
        }
      });
  }

  logout() {
    this.fireauth.signOut()
      .catch(error => this.message.error('Неуспешен изход!'))
      .then( res => {
      this.currentUser = null;
      this.currentUserId = null;
      this.message.success('Излязохте успешно!');
      this.router.navigateByUrl('/auth/login');
    });
  }
}
