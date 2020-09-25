import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fireauth: AngularFireAuth, private message: NzMessageService) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  submit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      const user = this.loginForm.value;
      this.fireauth.signInWithEmailAndPassword(user.email, user.password)
        .catch( error => this.message.error('Грешен имейл и/или парола!'));
    }
    else {
      this.message.warning('Невалидни полета!');
    }
  }

}
