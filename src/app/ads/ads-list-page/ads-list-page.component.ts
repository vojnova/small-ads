import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Ad} from '../../models/Ad';
import {FirestoreService} from '../../firestore/firestore.service';

@Component({
  selector: 'app-ads-list-page',
  templateUrl: './ads-list-page.component.html',
  styleUrls: ['./ads-list-page.component.scss']
})
export class AdsListPageComponent implements OnInit {
  ads: Ad[];

  constructor(private firestore: AngularFirestore) {
    this.firestore.collection<Ad>('ads').snapshotChanges().subscribe(data => {
      this.ads = [];
      for (const doc of data){
        const id = doc.payload.doc.id;
        const ad = doc.payload.doc.data();
        this.ads.push({...ad, id});
      }
    });
  }

  ngOnInit(): void {
  }

}
