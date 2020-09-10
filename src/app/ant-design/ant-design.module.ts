import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NzButtonModule, NzCardModule, NzFormModule, NzGridModule, NzIconModule, NzInputModule, NzToolTipModule} from 'ng-zorro-antd';

const MODULES = [
  NzCardModule,
  NzIconModule,
  NzGridModule,
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzInputModule
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
