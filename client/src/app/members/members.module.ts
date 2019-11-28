import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { MemberSearchModule } from '@app/member-search/member-search.module';
import { FilteredMembersModule } from '@app/filtered-members/filtered-members.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MembersRoutingModule,
    SharedModule,
    MemberSearchModule,
    FilteredMembersModule
  ],
  exports: [
    MembersComponent
  ],
  declarations: [MembersComponent]
})
export class MembersModule { }
