import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

import { RoleChecker } from '@app/shared';

import { Checkin, Event, Member } from '../../../sdk/models';
import { RegisteredUserApi, CheckinApi, EventApi } from '../../../sdk/services';
import { LoopBackAuth } from '../../../sdk/services/core/auth.service';

@Component({
  selector: 'checked-in-members-component',
  templateUrl: './checked-in-members.component.html',
  styleUrls: ['./checked-in-members.component.scss']
})
export class CheckedInMembersComponent implements OnInit {

  @Input() event: Event;
  @Input() displayCheckin: boolean = true;

  roleChecker: RoleChecker;

  checkedInMembers: { [id: number]: Member; } = {};
  checkins: Checkin[] = [];

  checkinStats: { [key: string]: number } = { "paid": 0, "new": 0 };

  @Output() undoCheckinEvent = new EventEmitter();

  constructor(private eventApi: EventApi,
    private userApi: RegisteredUserApi,
    protected auth: LoopBackAuth,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
    this.roleChecker = new RoleChecker(this.userApi);

    if (this.event.id) {
      this.refresh();
    }
  }

  refresh(): void {
    this.getCheckins();
  }

  onDownload(): void {

    //append a hyperlink to the page and click it.
    //https://stackoverflow.com/questions/19327749/javascript-blob-filename-without-link
    //above wrapped up in package: https://github.com/eligrey/FileSaver.js/
    var a: HTMLAnchorElement = document.createElement("a");
    document.body.appendChild(a);
    a.setAttribute("style", "display:none");

    this.eventApi.download(this.event.id).subscribe((data: any) => {

      const blob = new Blob([data.data], { type: "application/csv" });
      const url = window.URL.createObjectURL(blob);

      a.href = url;
      a.download = data.filename;
      a.click();
      window.URL.revokeObjectURL(url);
    })

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
      let stats: { [key: string]: number } = { "paid": 0, "new": 0 };
      members.forEach(member => {
        if (member.membershipLevel && member.membershipLevel !== "") {
          stats.paid += 1;
        }

        if (member.created > this.event.date) {
          stats.new += 1;
        }
        checkedIn[member.id] = member;
      });
      this.checkedInMembers = checkedIn;
      this.checkinStats = stats;
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
