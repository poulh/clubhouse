import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MembersRoutingModule,
    SharedModule
  ],
  exports: [
    MembersComponent
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
