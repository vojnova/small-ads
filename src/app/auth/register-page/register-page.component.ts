import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  public registerForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore,
              private router: Router, private fireauth: AngularFireAuth,
              private authService: AuthService) {
    this.registerForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      city: '',
      phone: '',
      password: ['', Validators.required],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      isAdmin: false
    });
  }

  ngOnInit(): void {
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }

  submit() {
    if (this.registerForm.valid){
      console.log(this.registerForm.value);
      const user = this.registerForm.value;
      delete user.checkPassword;
      this.fireauth.createUserWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          console.log(error.code + error.message);
          this.router.navigateByUrl('auth/register');
        })
        .then(res => {
          // @ts-ignore
          const id = res.user.uid;
          delete user.password;
          this.firestore.collection('users').doc(id).set(user);
          // this.authService.login(id);
        });
    }
  }

}
