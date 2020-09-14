import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../models/User';
import {AuthService} from '../../auth/auth.service';
import {FirestoreService} from '../../firestore/firestore.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ad',
  templateUrl: './ad.component.html',
  styleUrls: ['./ad.component.scss']
})
export class AdComponent implements OnInit {
  @Input() ad: Ad;
  public owner;

  constructor(private firestore: AngularFirestore, public authService: AuthService,
              private router: Router) {  }

  ngOnInit(): void {
    if (this.ad.owner){
      this.firestore.doc<User>('users/' + this.ad.owner).valueChanges().subscribe(data => this.owner = data);
    }
  }

  delete() {
    this.firestore.doc('ads/' + this.ad.id).delete().then(data => this.router.navigateByUrl('/ads'));
  }

  edit() {
    this.router.navigateByUrl('ads/' + this.ad.id);
  }
}
