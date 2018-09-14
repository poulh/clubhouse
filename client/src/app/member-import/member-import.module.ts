import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberImportRoutingModule } from './member-import-routing.module';
import { MemberImportComponent } from './member-import.component';

@NgModule({
  imports: [
    CommonModule,
    MemberImportRoutingModule
  ],
  declarations: [MemberImportComponent]
})
export class MemberImportModule { }
