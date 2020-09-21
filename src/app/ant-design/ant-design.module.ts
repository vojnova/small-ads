import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzButtonModule,
  NzCardModule,
  NzCommentModule,
  NzFormModule,
  NzGridModule,
  NzIconModule,
  NzInputModule, NzMessageModule, NzTabsModule,
  NzToolTipModule
} from 'ng-zorro-antd';

const MODULES = [
  NzCardModule,
  NzIconModule,
  NzGridModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzInputModule,
  NzCommentModule,
  NzTabsModule,
  NzMessageModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MODULES
  ],
  exports: [
    ...MODULES
  ]
})
export class AntDesignModule { }
