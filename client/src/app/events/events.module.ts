import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from '@app/events/events.component';

@NgModule({
  imports: [
    CommonModule,
    EventsRoutingModule
  ],
  declarations: [
    EventsComponent
  ]
})
export class EventsModule { }
