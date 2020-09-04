import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Ad} from '../../models/Ad';

@Component({
  selector: 'app-ads-list-page',
  templateUrl: './ads-list-page.component.html',
  styleUrls: ['./ads-list-page.component.scss']
})
export class AdsListPageComponent implements OnInit {
  ads$: Observable<Ad[]>;
  ads: Ad[];

  constructor(firestore: AngularFirestore) {
    this.ads$ = firestore.collection<Ad>('ads').valueChanges();
    this.ads$.subscribe(data => {this.ads = data; console.log(data); });
  }

  ngOnInit(): void {
  }

}
