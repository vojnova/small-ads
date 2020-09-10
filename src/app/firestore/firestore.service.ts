import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/User';
import {Ad} from '../models/Ad';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public users: User[];
  public ads: Ad[];

  constructor(private firestore: AngularFirestore) {
    this.updateUsers();
    this.updateAds();
  }

  updateUsers() {
    this.users = [];
    this.firestore.collection<User>('users').snapshotChanges().subscribe(data => {
      for (const doc of data){
        const id = doc.payload.doc.id;
        const user = doc.payload.doc.data();
        this.users.push({...user, id});
      }
    });
  }

  updateAds() {
    this.ads = [];
    this.firestore.collection<Ad>('ads').snapshotChanges().subscribe(data => {
      for (const doc of data){
        const id = doc.payload.doc.id;
        const ad = doc.payload.doc.data();
        this.ads.push({...ad, id});
      }
    });
  }

  getUsers() {
    return of(this.users);
  }

  getAds() {
    return of(this.ads);
  }
}
