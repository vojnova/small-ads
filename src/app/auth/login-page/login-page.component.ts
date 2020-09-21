import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Ad} from '../../models/Ad';
import {User} from '../../models/User';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {FirestoreService} from '../../firestore/firestore.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private users: User[] = [];
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore,
              private router: Router, private authService: AuthService,
              private fireauth: AngularFireAuth) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.firestore.collection<User>('users').snapshotChanges().subscribe(data => {
      for (const doc of data){
        const id = doc.payload.doc.id;
        const user = doc.payload.doc.data();
        this.users.push({id, ...user});
      }
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const user = this.loginForm.value;
      this.fireauth.signInWithEmailAndPassword(user.email, user.password)
        .catch( error => console.log(error.code + error.message))
        .then(res => {
          // @ts-ignore
          const id = res.user.uid;
          // this.authService.login(id);
        });
      // const found = this.users.find(u => u.email === user.email);
      // if (!found || (found && found.password !== user.password)){
      //   console.log('Auth failed!');
      // }
      // else {
      //   console.log('Auth success!');
      //   this.authService.login(found);
      //   this.router.navigateByUrl('/ads');
      // }
    }
  }

}
