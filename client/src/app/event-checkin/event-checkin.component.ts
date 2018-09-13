import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Checkin, Event, Member } from '../../../sdk/models';
import { CheckinApi, EventApi, MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-event-checkin',
  templateUrl: './event-checkin.component.html',
  styleUrls: ['./event-checkin.component.scss']
})
export class EventCheckinComponent implements OnInit {

  currentEvent: Event;
  eventId: any;
  checkedInMembers: { [id: number]: Member; } = {};
  checkins: Checkin[];
  members: Member[];

  constructor(private router: Router,
    private route: ActivatedRoute,
    private eventApi: EventApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
    const memberId = +this.route.snapshot.paramMap.get('memberId');
    this.eventId = +this.route.snapshot.paramMap.get('id');
    if (memberId && this.eventId) {
      this.onCheckinClick(memberId);
    } else if (this.eventId) {
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
    const filter = {
      where: { eventId: this.eventId },
      order: 'date DESC'
    };

    this.checkinApi.find<Checkin>(filter).subscribe((checkins: Checkin[]) => {
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

    const filter = {
      order: "lastName ASC, firstName ASC",
      where: {
        id: {
          nin: checkedInMemberIds
        }
      }
    };

    this.memberApi.find<Member>(filter).subscribe((members: Member[]) => this.members = members);
  }

  onUncheckinClick(memberId: any): void {
    const query = {
      memberId: memberId,
      eventId: this.eventId
    };

    this.checkinApi.findOne<Checkin>({ where: query }).subscribe((checkin: Checkin) => {
      this.checkinApi.deleteById(checkin.id).subscribe(checkin => {
        this.getCheckins();
      });
    });

  }

  onCheckinClick(memberId: any): void {
    const data = {
      date: new Date(),
      memberId: memberId,
      eventId: this.eventId
    };

    this.checkinApi.create(data).subscribe((checkin: Checkin) => {
      this.getCheckins();
    });
  }

  onNewMemberClick(): void {
    const url = `/member/event/${this.eventId}`;
    this.router.navigateByUrl(url);
  }

}
