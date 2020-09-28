import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Ad} from '../../models/Ad';
import {User} from '../../models/User';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
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
  public tabIndex;
  @ViewChild('addQuestion') input;

  constructor(private firestore: FirestoreService, public authService: AuthService,
              private router: Router, private message: NzMessageService) {  }

  ngOnInit(): void {
    if (this.ad.owner){
      this.firestore.getUserById(this.ad.owner).subscribe(data => {
        this.owner = data;
      });
    }
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
        this.ad = null;
      });
  }

  edit() {
    this.router.navigateByUrl('ads/edit/' + this.ad.id);
  }

  ask() {
    if (this.tabIndex !== 1) {
      this.tabIndex = 1;
      const input = this.input;
      setTimeout(func => { input.nativeElement.focus(); }, 300);
      return;
    }
    const content = this.askInput.value;
    if (content) {
    const messageId = this.message.loading('Обработва се...').messageId;
    const from = this.authService.currentUserId;
    const date = Date.now();
    const ad = this.ad.id;
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

  trackByFn(index, element) {
    return element.id;
  }
}
