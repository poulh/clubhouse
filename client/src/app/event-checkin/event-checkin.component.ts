import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  checkedInButtons: object[] = [
    {
      text: "Undo Checkin",
      class: "btn btn-primary w-100"
    }
  ]

  notCheckedInQueryFilter: object = {
    order: this.orderQueryString
  }

  notCheckedInButtons: object[] = [
    {
      text: "Edit Member",
      class: "btn btn-secondary"
    },
    {
      text: "Checkin",
      class: "btn btn-primary w-100"
    }
  ]

  filter: string = ""

  constructor(
    private router: Router,
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

  handleCheckedInMemberButtonClick(event: object) {
    console.log("checked in")
    console.log(event)
    if (event['index'] == 0) {
      this.onUndoCheckin(event['memberid'])
    }
  }

  handleNotCheckedInMemberButtonClick(event: object) {
    console.log("not checked in")
    console.log(event)
    switch (event['index']) {
      case 0: {
        this.onEditMember(event['memberid'])
        break
      }
      case 1: {
        this.onCheckin(event['memberid'])
        break
      }
    }
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


  onEditMember(memberId: any): void {
    const url = `/member/${memberId}/event/${this.event.id}`
    this.router.navigateByUrl(url);
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
