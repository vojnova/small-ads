import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import {RouterModule} from '@angular/router';

const routes = [
  {path: '', component: UserPageComponent}
];

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
