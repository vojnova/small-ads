import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from '../../models/Question';
import {FirestoreService} from '../../firestore/firestore.service';
import {NzMessageService} from 'ng-zorro-antd';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  public owner;
  public editing = false;
  @ViewChild('input') input;

  constructor(private firestore: FirestoreService, private message: NzMessageService,
              public auth: AuthService) { }

  ngOnInit(): void {
    this.firestore.getUserById(this.question.from)
      .subscribe(user => this.owner = user);
  }

  delete() {
    this.firestore.deleteQuestion(this.question.id)
      .catch(error => this.message.error('Неуспешно изтриване!'))
      .then(res => {
        this.message.success('Успешно изтриване!');
        this.question = null;
      });
  }

  onEdit() {
    this.editing = !this.editing;
  }

  edit() {
    const content = this.input.nativeElement.value;
    if (content != this.question.content) {
      this.firestore.editQuestion(this.question.id, content)
        .then(data => {
          this.question.content = content;
        });
    }
    this.editing = false;
  }
}
