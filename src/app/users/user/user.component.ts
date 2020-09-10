import {Component, Input, OnInit} from '@angular/core';
import {Ad} from '../../models/Ad';
import {User} from '../../models/User';
import {AuthService} from '../../auth/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() user: User;

  constructor(public authService: AuthService, private firestore: AngularFirestore) { }

  ngOnInit(): void {
  }

}
