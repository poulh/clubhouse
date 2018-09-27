import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MembersRoutingModule
  ],
  exports: [
    MembersComponent
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
