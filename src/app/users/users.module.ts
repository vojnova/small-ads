import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListPageComponent } from './users-list-page/users-list-page.component';
import {RouterModule} from '@angular/router';
import { UserComponent } from './user/user.component';
import {AntDesignModule} from '../ant-design/ant-design.module';

const routes = [
  {path: '', component: UsersListPageComponent}
];

@NgModule({
  declarations: [UsersListPageComponent, UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AntDesignModule
  ]
})
export class UsersModule { }
