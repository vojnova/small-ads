import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../auth/auth.service';
import {FirestoreService} from '../../firestore/firestore.service';
import {Ad} from '../../models/Ad';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  createForm: FormGroup;
  isEditing = false;
  id;
  ad: Ad;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore,
              private router: Router, private authService: AuthService,
              private activatedRoute: ActivatedRoute, private message: NzMessageService) {
    activatedRoute.paramMap.subscribe(params => {
      if (params.get('id')){
        this.isEditing = true;
        this.id = params.get('id');
        this.firestore.doc<Ad>('ads/' + this.id).valueChanges().subscribe(data => {
          this.ad = data;
          this.createForm = fb.group({
              title: [this.ad.title, Validators.required],
              description: [this.ad.description, Validators.required],
              price: this.ad.price,
              date: this.ad.date,
              active: this.ad.active,
              owner: this.ad.owner
            }
          );
        });
      }
      else {
        this.createForm = fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            price: 0,
            date: Date.now(),
            active: true,
            owner: authService.currentUser.id
          }
        );
      }
    });
  }

  submit(){
    if (this.createForm.valid){
      const messageId = this.message.loading('Обработва се...').messageId;
      if (this.isEditing) {
        this.firestore.doc('ads/' + this.id).update(this.createForm.value)
          .then(data => {
            this.message.remove(messageId);
            this.message.success('Редактирането е успешно!');
            this.router.navigateByUrl('/ads');
          });
      }
      else {
        this.firestore.collection('ads').add(this.createForm.value)
          .then(data => {
            this.message.remove(messageId);
            this.message.success('Обявата е добавена успешно!');
            this.router.navigateByUrl('/ads');
          });
      }
    }
    else {
      this.message.warning('Има невалидни полета!');
    }
  }

  ngOnInit(): void {
  }

}
