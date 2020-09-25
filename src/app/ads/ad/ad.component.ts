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
import {FirestoreService} from '../../firestore/firestore.service';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() ad: Ad;
  public owner: User | any;
  public questions;
  public askInput = new FormControl('');

  constructor(private firestore: FirestoreService, public authService: AuthService,
              private router: Router, private message: NzMessageService) {  }

  ngOnInit(): void {
    if (this.ad.owner){
      // this.firestore.doc<User>('users/' + this.ad.owner).valueChanges()
      //   .subscribe(data => this.owner = data);
      this.firestore.getUserById(this.ad.owner).subscribe(data => {
        this.owner = data;
      });
    }
    // if (this.ad.questions){
    //   for (const questionId of this.ad.questions){
    //     this.firestore.getQuestionById(questionId)
    //       .subscribe(question => {
    //         if (question) {
    //           this.firestore.getUserById(question.from).subscribe(user => {
    //             // @ts-ignore
    //             this.questions.push({...question, id: questionId, from: user});
    //           });
    //         }
    //       });
    //   }
    // }
    this.firestore.getQuestionsForAd(this.ad.id)
      .then(data => {
        const array = [];
        data.forEach(doc => {
          const id = doc.id;
          const question = doc.data();
          array.push({...question, id});
        });
        this.questions = array;
      });
  }

  delete() {
    this.firestore.deleteAd(this.ad.id)
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
      this.firestore.addQuestion({content, from, date, ad})
        .catch(error => {
          this.message.remove(messageId);
          this.message.error('Въпросът не можа да се добави!');
        })
        .then(question => {
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
