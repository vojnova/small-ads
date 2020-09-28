import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../models/User';
import {Ad} from '../models/Ad';
import {map} from 'rxjs/operators';
import {Question} from '../models/Question';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  public users: User[];
  public ads: Ad[];
  public users$;
  public ads$;

  constructor(private firestore: AngularFirestore) {
    this.users$ = this.firestore.collection<User>('users')
      .valueChanges({idField: 'id'});
    this.ads$ = this.firestore.collection<Ad>('ads',
        ref => ref.orderBy('date'))
      .valueChanges({idField: 'id'});
  }

  getUsers() {
    return this.users$;
  }

  getAds() {
    return this.ads$;
  }

  getAdsByUsedId(userId) {
    return this.firestore.collection<Ad>('ads',
        ref => ref.where('owner', '==', userId))
      .valueChanges({idField: 'id'});
  }

  getUserById(id) {
    return this.firestore.doc<User>('users/' + id).get()
      .pipe(map(doc => doc.data()));
  }

  getAdById(id) {
    return this.firestore.doc<Ad>('ads/' + id).get()
      .pipe(map(doc => doc.data()));

    // return this.firestore.doc<Ad>('ads/' + id).snapshotChanges()
    //   .pipe(map(doc => {
    //     const data = doc.payload.data();
    //     const ownerId = data.owner;
    //     const owner = this.getUserById(ownerId);
    //     const questions = data.questions;
    //     return {...data, owner};
    //   }));
    //
    // const docRef = this.firestore.collection<Ad>('ads').doc(id);
    // return docRef.get().pipe(map(doc => {
    //   if (doc.exists) {
    //     const ad = doc.data();
    //     const ownerId = ad.owner;
    //     console.log('doc exists');
    //     return this.firestore.doc('users/' + ownerId).get().pipe(map(user => {
    //       console.log('owner pipe');
    //       const owner = user.data();
    //       console.log({...ad, owner});
    //       return {...ad, owner};
    //     }));
    //   }
    // }));
  }

  getQuestionById(id) {
    return this.firestore.doc<Question>('questions/' + id).get()
      .pipe(map(doc => doc.data()));
  }

  deleteAd(id) {
    return this.firestore.doc('ads/' + id).delete();
  }

  async addQuestion(question: Question) {
    const q = await this.firestore.collection('questions').add(question);
    const id = q.id;
    console.log('id' + id);
    await this.firestore.doc('ads/' + question.ad).update({
      questions: firebase.firestore.FieldValue.arrayUnion(id)
    });
  }

  getQuestionsForAd(adId) {
    return this.firestore.collection<Question>('questions').ref
      .where('ad', '==', adId).get();
  }

  deleteQuestion(id) {
    return this.firestore.doc('questions/' + id).delete();
  }
}
