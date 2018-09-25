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
  sortOrder: [string, boolean][] = [];
  search: string;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private eventApi: EventApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) {

    this.search = "";
    this.sortOrder = [["lastName", true], ["firstName", true]];

  }

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

  sort(field: string): void {
    /*
     If clicked field is already first it flips the asc/desc.
     If clicked field is not first, move it to first and set everything asc
     */
    let firstItem = this.sortOrder[0];
    if (field == firstItem[0]) {
      firstItem[1] = !firstItem[1];
    } else {
      const item = this.sortOrder.find(i => i[0] == field);
      const index = this.sortOrder.indexOf(item);
      this.sortOrder.splice(index);
      this.sortOrder.unshift(item);
      this.sortOrder.forEach(i => i[1] = true);
    }
    this.getCheckins();
  }

  clearSearch(): void {
    this.search = "";
  }

  displayMember(member: Member): boolean {
    if (this.search.length == 0) {
      return true;
    }

    return member.firstName.toLowerCase().includes(this.search) ||
      member.lastName.toLowerCase().includes(this.search) ||
      member.email.toLowerCase().includes(this.search) ||
      member.cellPhone.toLowerCase().includes(this.search);
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
    const orderQueryString = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");

    const filter = {
      order: orderQueryString,
      where: {
        id: {
          nin: checkedInMemberIds
        }
      }
    };

    this.memberApi.find<Member>(filter).subscribe((members: Member[]) => {
      this.clearSearch();
      this.members = members;
    });
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
