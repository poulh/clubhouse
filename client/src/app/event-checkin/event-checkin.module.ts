import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembersModule } from '@app/members/members.module';
import { CheckedInMembersModule } from '@app/checked-in-members/checked-in-members.module';
import { EventCheckinRoutingModule } from './event-checkin-routing.module';
import { EventCheckinComponent } from './event-checkin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MembersModule,
    CheckedInMembersModule,
    EventCheckinRoutingModule
  ],
  declarations: [EventCheckinComponent]
})
export class EventCheckinModule { }
