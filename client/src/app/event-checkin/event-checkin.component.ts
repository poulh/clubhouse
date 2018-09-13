import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Checkin, Event, Member } from '../../../sdk/models';
import { CheckinApi, EventApi, MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.scss']
})
export class EventCheckinComponent implements OnInit {

  currentEvent: Event;
  eventId: number;
  checkedInMembers: Member[];
  members: Member[];

  constructor(private route: ActivatedRoute,
    private eventApi: EventApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = id;
      this.getMembers();
    }
    this.getEventDetails();
  }

  getEventDetails(): void {
    this.eventApi.findById<Event>(this.eventId).subscribe(event => {
      this.currentEvent = event;
    });
  }

  getMembers(): void {
    this.eventApi.getMembers(this.eventId).subscribe((members: Member[]) => {

      console.log(members);
      this.checkedInMembers = members;
      const checkedInMemberIds = this.checkedInMembers.map(member => {
        return member.id;
      });

      this.getUncheckedInMembers(checkedInMemberIds);
    });
  }

  getUncheckedInMembers(checkedInMemberIds: number[]): void {
    const query = {
      id: {
        nin: checkedInMemberIds
      }
    };

    this.memberApi.find<Member>({ where: query }).subscribe((members: Member[]) => this.members = members);
  }

  onUncheckinClick(member: Member): void {
    const query = {
      memberId: member.id,
      eventId: this.eventId
    };

    this.checkinApi.findOne<Checkin>({ where: query }).subscribe((checkin: Checkin) => {
      this.checkinApi.deleteById(checkin.id).subscribe(checkin => {
        console.log("deleted");
        console.log(checkin);
        this.getMembers();
      });
    });

  }

  onCheckinClick(member: Member): void {
    const data = {
      date: new Date(),
      memberId: member.id,
      eventId: this.eventId
    };

    this.checkinApi.create(data).subscribe((checkin: Checkin) => {
      console.log(checkin);
      this.getMembers();
    });
  }

}
