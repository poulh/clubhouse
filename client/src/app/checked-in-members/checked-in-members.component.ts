import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { Checkin, Event, Member } from '../../../sdk/models';
import { CheckinApi, EventApi } from '../../../sdk/services';

@Component({
  selector: 'checked-in-members-component',
  templateUrl: './checked-in-members.component.html',
  styleUrls: ['./checked-in-members.component.scss']
})
export class CheckedInMembersComponent implements OnInit {

  @Input() event: Event;
  @Input() showCheckin: boolean = true;

  checkedInMembers: { [id: number]: Member; } = {};
  checkins: Checkin[];

  @Output() undoCheckinEvent = new EventEmitter();

  constructor(private eventApi: EventApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
    if (this.event.id) {
      this.refresh();
    }
  }

  refresh(): void {
    this.getCheckins();
  }

  private getCheckins(): void {
    const filter = {
      where: { eventId: this.event.id },
      order: 'date DESC'
    };

    this.checkinApi.find<Checkin>(filter).subscribe((checkins: Checkin[]) => {
      this.checkins = checkins;

      this.getCheckedInMembers();
    });
  }

  private getCheckedInMembers(): void {
    this.eventApi.getMembers(this.event.id).subscribe((members: Member[]) => {
      let checkedIn: { [id: number]: Member; } = {};
      members.forEach(member => {
        checkedIn[member.id] = member;
      });
      this.checkedInMembers = checkedIn;
    });
  }

  onUndoCheckin(memberId: any): void {
    const query = {
      memberId: memberId,
      eventId: this.event.id
    };

    this.checkinApi.findOne<Checkin>({ where: query }).subscribe((checkin: Checkin) => {
      this.checkinApi.deleteById(checkin.id).subscribe(checkin => {
        this.refresh();
        this.undoCheckinEvent.emit(checkin);
      });
    });
  }
}
