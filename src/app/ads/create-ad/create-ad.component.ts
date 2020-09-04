import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.scss']
})
export class CreateAdComponent implements OnInit {
  createForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: AngularFirestore, private router: Router) {
    this.createForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: 0,
      date: Date.now(),
      active: true,
      owner: null
      }
    );
  }

  submit(){
    if (this.createForm.valid){
      console.log(this.createForm.value);
      this.firestore.collection('ads').add(this.createForm.value);
      this.router.navigateByUrl('/ads');
    }
  }

  ngOnInit(): void {
  }

}