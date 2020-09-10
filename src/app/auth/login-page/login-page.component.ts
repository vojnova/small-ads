import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {Ad} from '../../models/Ad';
import {User} from '../../models/User';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';
import {FirestoreService} from '../../firestore/firestore.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  private users: User[];
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: FirestoreService,
              private router: Router, private authService: AuthService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.users = firestore.users;
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const user = this.loginForm.value;
      const found = this.users.find(u => u.email = user.email);
      if (!found || found && found.password !== user.password){
        console.log('Auth failed!');
      }
      else {
        console.log('Auth success!');
        this.authService.login(found);
        this.router.navigateByUrl('/ads');
      }
    }
  }

}
