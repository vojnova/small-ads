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

  constructor(firestore: FirestoreService) {
    firestore.getAds().subscribe(data => this.ads = data);
  }

  ngOnInit(): void {
  }

}
