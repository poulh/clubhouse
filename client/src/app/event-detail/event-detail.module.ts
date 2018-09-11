import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventDetailsRoutingModule } from '@app/event-detail/event-detail-routing.module';
import { EventDetailsComponent } from '@app/event-detail/event-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EventDetailsRoutingModule
  ],
  declarations: [EventDetailsComponent]
})
export class EventDetailsModule { }
