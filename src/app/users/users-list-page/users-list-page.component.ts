import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/User';
import {FirestoreService} from '../../firestore/firestore.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {

  public users: User[];

  constructor(private firestore: FirestoreService) {
    // firestore.collection<User>('users').valueChanges()
    //   .subscribe(data => this.users = data);
    // firestore.collection<User>('users').snapshotChanges().subscribe(data => {
    //   for (const doc of data){
    //     const id = doc.payload.doc.id;
    //     const user = doc.payload.doc.data();
    //     this.users.push({...user, id});
    //   }
    // });
    this.users = firestore.users;
  }

  ngOnInit(): void { }

}
