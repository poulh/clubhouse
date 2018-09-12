import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { EventDetailRoutingModule } from '@app/event-detail/event-detail-routing.module';
import { EventDetailComponent } from '@app/event-detail/event-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    EventDetailRoutingModule
  ],
  declarations: [EventDetailComponent],
})
export class EventDetailModule { }
