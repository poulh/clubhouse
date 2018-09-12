import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
  imports: [
    CommonModule,
    MembersRoutingModule
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
