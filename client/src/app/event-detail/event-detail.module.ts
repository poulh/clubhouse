import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { EventDetailRoutingModule } from '@app/event-detail/event-detail-routing.module';
import { EventDetailComponent } from '@app/event-detail/event-detail.component';

@NgModule({
  imports: [
    NgbDatepickerModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    EventDetailRoutingModule
  ],
  declarations: [EventDetailComponent],
})
export class EventDetailModule { }
