import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckedInMembersModule } from '@app/checked-in-members/checked-in-members.module';
import { EventCheckinRoutingModule } from './event-checkin-routing.module';
import { EventCheckinComponent } from './event-checkin.component';
import { MemberSearchModule } from '@app/member-search/member-search.module';
import { FilteredMembersModule } from '@app/filtered-members/filtered-members.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CheckedInMembersModule,
    EventCheckinRoutingModule,
    MemberSearchModule,
    FilteredMembersModule
  ],
  declarations: [EventCheckinComponent]
})
export class EventCheckinModule { }
