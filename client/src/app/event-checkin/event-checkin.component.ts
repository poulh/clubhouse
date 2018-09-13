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
  checkedInMembers: { [id: number]: Member; } = {};
  checkins: Checkin[];
  members: Member[];

  constructor(private route: ActivatedRoute,
    private eventApi: EventApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.eventId = id;
      this.getCheckins();
    }
    this.getEventDetails(); //event title and things like that
  }

  getEventDetails(): void {
    this.eventApi.findById<Event>(this.eventId).subscribe(event => {
      this.currentEvent = event;
    });
  }

  getCheckins(): void {
    this.checkinApi.find<Checkin>({ where: { eventId: this.eventId } }).subscribe((checkins: Checkin[]) => {
      this.checkins = checkins;

      const checkedInMemberIds: number[] = checkins.map(checkin => {
        return checkin.memberId;
      })
      this.getCheckedInMembers();
      this.getUncheckedInMembers(checkedInMemberIds);

    });
  }

  getCheckedInMembers(): void {
    this.eventApi.getMembers(this.eventId).subscribe((members: Member[]) => {
      this.checkedInMembers = {};
      members.forEach(member => {
        this.checkedInMembers[member.id] = member;
      })
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
        this.getCheckins();
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
      this.getCheckins();
    });
  }

}
