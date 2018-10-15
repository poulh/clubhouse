import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { RoleChecker } from '@app/shared';

import { Checkin, Member } from '../../../sdk/models';
import { CheckinApi, MemberApi, RegisteredUserApi } from '../../../sdk/services';
import { continueStatement } from 'babel-types';

@Component({
  selector: 'members-component',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  roleChecker: RoleChecker;

  isLoading = false;
  @Input() title: string = "Members";
  @Input() displayImport: boolean = true;

  allMembers: Member[];
  members: Member[];
  membersCache: String[];
  sortOrder: [string, boolean][] = [["lastName", true], ["firstName", true]];
  search: string = "";

  @Output() checkinEvent = new EventEmitter();

  @Input() eventId: any;
  checkedInMemberIds: number[] = [];

  constructor(private router: Router,
    private userApi: RegisteredUserApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) {
  }

  ngOnInit() {
    this.roleChecker = new RoleChecker(this.userApi);
    this.refresh();
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
    this.refresh();
  }

  clearSearch(): void {
    this.search = "";
    this.members = this.allMembers;
  }

  filterSearch(event?: any) {
    if (this.search.length == 0) {
      this.clearSearch();
    }

    const words = this.search.toLowerCase().split(" ");
    let filteredMembers: Member[] = [];
    this.membersCache.forEach((cache, index) => {
      const allWordsMatch = words.every(word => {
        return cache.includes(word);
      });

      if (allWordsMatch) {
        filteredMembers.push(this.allMembers[index]);
      }
    });

    this.members = filteredMembers;
  }

  getMembers(): void {
    this.isLoading = true;

    const orderQueryString = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");
    const filter = {
      order: orderQueryString,
      where: {
        id: {
          nin: this.checkedInMemberIds
        }
      }
    };

    this.memberApi.find<Member>(filter).subscribe(members => {
      this.allMembers = members;
      this.membersCache = members.map(member => {
        const firstName = member.firstName ? member.firstName.toLowerCase() : "";
        const lastName = member.lastName ? member.lastName.toLowerCase() : "";
        const email = member.email ? member.email.toLowerCase() : "";
        const mobilePhone = member.mobilePhone ? member.mobilePhone : "";
        const homePhone = member.homePhone ? member.homePhone : "";
        const workPhone = member.workPhone ? member.workPhone : "";
        const otherPhone = member.otherPhone ? member.otherPhone : "";
        return firstName + lastName + email + mobilePhone + homePhone + workPhone + otherPhone;
      });

      this.filterSearch();

      this.isLoading = false;
    });
  }

  onNewMemberClick(): void {
    if (this.eventId) {
      this.router.navigateByUrl(`/member/event/${this.eventId}`);
    } else {
      this.router.navigateByUrl("/member");
    }
  }

  onEditDetails(memberId: any): void {
    const url = this.eventId ? `/member/${memberId}/event/${this.eventId}` : `/member/${memberId}`;
    this.router.navigateByUrl(url);
  }

  onCheckin(memberId: any): void {
    console.log('click');
    const data = {
      date: new Date(), //todo: this should be set on the server
      memberId: memberId,
      eventId: this.eventId
    };

    this.checkinApi.create(data).subscribe((checkin: Checkin) => {
      console.log('checked in');
      this.clearSearch();
      this.refresh();
      this.checkinEvent.emit(checkin);
    });
  }

  refresh(): void {
    if (this.eventId) {
      const filter = {
        where: { eventId: this.eventId },
      };

      this.checkinApi.find<Checkin>(filter).subscribe((checkins: Checkin[]) => {
        this.checkedInMemberIds = checkins.map(checkin => {
          return checkin.memberId;
        });
        this.getMembers();
      });
    } else {
      this.getMembers();
    }
  }
}
