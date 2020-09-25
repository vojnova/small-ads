import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FirestoreService} from './firestore/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;

  constructor(public authService: AuthService, public fireauth: AngularFireAuth, firestore: FirestoreService) {
    fireauth.user.subscribe(user => {
      if (user){
        authService.login(user.uid);
      }
    });
    // firestore.getAdById('1heUTH5xV0gSmDieNcpB').subscribe(data => {
    //   console.log(data);
    //   if (data) {
    //     data.subscribe(data2 => console.log(data2));
    //   }
    // });
    // console.log('ad ' + ad);
  }
}
