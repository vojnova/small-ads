import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/User';
import {Ad} from '../models/Ad';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public users: User[];
  public ads: Ad[];
  public users$;
  public ads$;

  constructor(private firestore: AngularFirestore) {
    this.updateUsers();
    this.updateAds();
  }

  updateUsers() {
    this.firestore.collection<User>('users').snapshotChanges().subscribe(data => {
      this.users = [];
      for (const doc of data){
        const id = doc.payload.doc.id;
        const user = doc.payload.doc.data();
        this.users.push({id, ...user});
      }
      // this.users$.next(this.users);
      console.log('new data users');
    });
  }

  updateAds() {
    this.firestore.collection<Ad>('ads').snapshotChanges().subscribe(data => {
      this.ads = [];
      for (const doc of data){
        const id = doc.payload.doc.id;
        const ad = doc.payload.doc.data();
        this.ads.push({...ad, id});
      }
      // this.ads$.next(this.ads);
      console.log('new data ads');
    });
  }

  getUsers() {
    return of(this.users);
  }

  getAds() {
    return of(this.ads);
  }
}
