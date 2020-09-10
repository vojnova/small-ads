import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/User';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: User = null;

  constructor(private http: HttpClient, private router: Router) {  }

  login(user: User) {
    this.currentUser = user;
  }

  logout() {
    this.currentUser = null;
    this.router.navigateByUrl('/auth/login');
  }
}
