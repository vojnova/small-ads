import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsListPageComponent } from './ads-list-page/ads-list-page.component';
import {RouterModule} from '@angular/router';
import { AdComponent } from './ad/ad.component';
import { CreateAdComponent } from './create-ad/create-ad.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AntDesignModule} from '../ant-design/ant-design.module';
import {UserGuard} from '../auth/user.guard';

const routes = [
  {path: '', component: AdsListPageComponent},
  {path: 'create', component: CreateAdComponent, canActivate: [UserGuard]}
];

@NgModule({
  declarations: [AdsListPageComponent, AdComponent, CreateAdComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AntDesignModule
  ]
})
export class AdsModule { }
