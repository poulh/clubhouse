import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Checkin, Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

import { CheckinApi, RegisteredUserApi } from '../../../sdk/services';
import { MemberSearchComponent } from '../member-search/member-search.component'

@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.scss']
})
export class EventCheckinComponent implements OnInit {

  @ViewChild('memberSearch') memberSearch: MemberSearchComponent;


  event: Event;

  sortOrder: [string, boolean][] = [["lastName", true], ["firstName", true]];

  orderQueryString: string = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");

  checkedInQueryFilter: object = {
    order: this.orderQueryString
  }

  notCheckedInQueryFilter: object = {
    order: this.orderQueryString
  }

  filter: string = ""

  constructor(
    private route: ActivatedRoute,
    private eventApi: EventApi, private checkinApi: CheckinApi) {
  }

  ngOnInit() {
    let eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.findEvent(eventId)
    }
  }

  findEvent(eventId: any): void {
    const eventQuery = {
      where: {
        id: eventId
      }
    };

    this.eventApi.findOne<Event>(eventQuery).subscribe(event => {
      this.event = event;
      this.findCheckins(this.event.id)
    });
  }

  filterSearch(search: string) {
    if (!search) {

      search = "";
    }

    //this will trigger ngChanges in child components
    this.filter = search;
  }

  onCheckin(memberId: any): void {
    const data = {
      date: new Date(),
      memberId: memberId,
      eventId: this.event.id
    };

    this.checkinApi.create(data).subscribe((checkin: Checkin) => {
      this.findCheckins(this.event.id)
    });
  }

  onUndoCheckin(memberId: any): void {
    const query = {
      memberId: memberId,
      eventId: this.event.id
    };

    this.checkinApi.findOne<Checkin>({ where: query }).subscribe((checkin: Checkin) => {
      this.checkinApi.deleteById(checkin.id).subscribe(checkin => {
        this.findCheckins(this.event.id)
      });
    });
  }

  findCheckins(eventId: any): void {
    const checkinFilter = {
      where: { eventId: this.event.id },
    };

    this.checkinApi.find<Checkin>(checkinFilter).subscribe((checkins: Checkin[]) => {

      const checkedInMemberIds = checkins.map(checkin => {
        return checkin.memberId;
      });

      this.checkedInQueryFilter['where'] = { id: { inq: checkedInMemberIds } }
      this.checkedInQueryFilter = Object.assign({}, this.checkedInQueryFilter);
      this.notCheckedInQueryFilter['where'] = { id: { nin: checkedInMemberIds } }
      this.notCheckedInQueryFilter = Object.assign({}, this.notCheckedInQueryFilter);
      this.memberSearch.clearSearch()

    });

  }
}
