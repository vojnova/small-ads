import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  constructor(public authService: AuthService, public fireauth: AngularFireAuth) { console.log(fireauth.user); }
}
