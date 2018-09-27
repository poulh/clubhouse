import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { SharedModule } from '@app/shared';

import { CheckedInMembersModule } from '@app/checked-in-members/checked-in-members.module';

import { EventDetailRoutingModule } from '@app/event-detail/event-detail-routing.module';
import { EventDetailComponent } from '@app/event-detail/event-detail.component';

@NgModule({
  imports: [
    NgbDatepickerModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    SharedModule,
    CheckedInMembersModule,
    EventDetailRoutingModule
  ],
  declarations: [EventDetailComponent],
})
export class EventDetailModule { }
