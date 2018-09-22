import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from '@app/shared';

import { MemberDetailRoutingModule } from './member-detail-routing.module';
import { MemberDetailComponent } from './member-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    MemberDetailRoutingModule
  ],
  declarations: [MemberDetailComponent]
})
export class MemberDetailModule { }
