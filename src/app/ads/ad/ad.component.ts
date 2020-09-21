import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/User';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {Question} from '../../models/Question';
import {FormControl, Validators} from '@angular/forms';
import * as firebase from 'firebase';
import {NzMessageService} from 'ng-zorro-antd';

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
              private router: Router, private message: NzMessageService) {  }

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
    this.firestore.doc('ads/' + this.ad.id).delete()
      .then(data => {
        this.message.success('Обявата беше изтрита!');
        this.router.navigateByUrl('/ads');
      });
  }

  edit() {
    this.router.navigateByUrl('ads/' + this.ad.id);
  }

  ask() {
    const messageId = this.message.loading('Обработва се...').messageId;
    const content = this.askInput.value;
    const from = this.authService.currentUserId;
    const date = Date.now();
    const ad = this.ad.id;
    if (content) {
      this.firestore.collection('questions').add({content, from, date, ad})
        .catch(error => {
          this.message.remove(messageId);
          this.message.error('Въпросът не можа да се добави!');
        })
        .then(question => {
          // @ts-ignore
          const id = question.id;
          this.firestore.doc('ads/' + this.ad.id).update({
            questions: firebase.firestore.FieldValue.arrayUnion(id)
          });
          this.message.remove(messageId);
          this.message.success('Въпросът е добавен успешно!');
          this.router.navigateByUrl('/ads');
        });
      this.askInput.setValue('');
    }
    else {
      this.message.warning('Не може да оставите полето празно!');
    }
  }
}
