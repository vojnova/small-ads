import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {Ad} from '../../models/Ad';
import {FirestoreService} from '../../firestore/firestore.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-ads-list-page',
  templateUrl: './ads-list-page.component.html',
  styleUrls: ['./ads-list-page.component.scss']
})
export class AdsListPageComponent implements OnInit {
  ads: Ad[] = [];

  constructor(private firestore: FirestoreService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('userId') && params.get('userId')) {
        this.firestore.getAdsByUsedId(params.get('userId'))
          .subscribe(data => this.ads = data);
      }
      else {
        this.firestore.getAds().subscribe(data => this.ads = data);
      }
    });
  }

  trackByFn(index, element) {
    return element.id;
  }

  ngOnInit(): void {
  }

}
