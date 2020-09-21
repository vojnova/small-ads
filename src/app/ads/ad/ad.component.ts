import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/User';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Question} from '../../models/Question';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() ad: Ad;
  public owner: User;
  public questions: Question[] = [];
  public askInput = new FormControl('');

  constructor(private firestore: AngularFirestore, public authService: AuthService,
              private router: Router) {  }

  ngOnInit(): void {
    if (this.ad.owner){
      this.firestore.doc<User>('users/' + this.ad.owner).valueChanges()
        .subscribe(data => this.owner = data);
    }
    if (this.ad.questions){
      for (const question of this.ad.questions){
        this.firestore.doc<Question>('questions/' + question).valueChanges()
          .subscribe(data => {
            this.firestore.doc<User>('users/' + data.from).valueChanges().subscribe(user => {
              this.questions.push({...data, from: user});
            });
          });
      }
    }
  }

  delete() {
    this.firestore.doc('ads/' + this.ad.id).delete().then(data => this.router.navigateByUrl('/ads'));
  }

  edit() {
    this.router.navigateByUrl('ads/' + this.ad.id);
  }

  ask() {
    const content = this.askInput.value;
    const from = this.authService.currentUserId;
    const date = Date.now();
    const ad = this.ad.id;
    this.firestore.collection('questions').add({content, from, date, ad})
      .then(question => {
        const id = question.id;
        this.firestore.doc('ads/' + this.ad.id).update({
          questions: firebase.firestore.FieldValue.arrayUnion(id)
        });
        this.router.navigateByUrl('/ads');
      });
    this.askInput.setValue('');
  }
}
