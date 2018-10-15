import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Checkin, Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

import { MembersComponent } from '@app/members/members.component';
import { CheckedInMembersComponent } from '@app/checked-in-members/checked-in-members.component';


@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.scss']
})
export class EventCheckinComponent implements OnInit {

  currentEvent: Event;

  @ViewChild(CheckedInMembersComponent)
  private checkedInMembers: CheckedInMembersComponent;

  @ViewChild(MembersComponent)
  private members: MembersComponent;

  constructor(
    private route: ActivatedRoute,
    private eventApi: EventApi) {
  }

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      const query = {
        where: {
          id: eventId
        }
      };
      this.eventApi.findOne<Event>(query).subscribe(event => {
        this.currentEvent = event;
      });
    }
  }

  onCheckin(checkin: Checkin) {
    console.log(checkin);
    this.checkedInMembers.refresh();
  }

  onUndoCheckin(checkin: Checkin): void {
    console.log(checkin);
    this.members.refresh();
  }

}
