import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventCheckinRoutingModule } from './event-checkin-routing.module';
import { EventCheckinComponent } from './event-checkin.component';

@NgModule({
  imports: [
    CommonModule,
    EventCheckinRoutingModule
  ],
  declarations: [EventCheckinComponent]
})
export class EventCheckinModule { }
