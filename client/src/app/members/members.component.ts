import { Component, OnInit, Input, EventEmitter, Output, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { RoleChecker } from '@app/shared';

import { Member } from '../../../sdk/models';
import { RegisteredUserApi } from '../../../sdk/services';
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
  @Input() displayUnfilteredMembers = true;

  sortOrder: [string, boolean][] = [["lastName", true], ["firstName", true]];
  orderQueryString: string = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");

  buttons: object[] = [
    {
      text: "Edit Member",
      class: "btn btn-primary w-100"
    }
  ]

  queryFilter: object = {
    order: this.orderQueryString,
    where: {}
  };

  filter: string = "";

  allMembers: Member[];
  members: Member[] = [];

  @Output() checkinEvent = new EventEmitter();

  @Input() eventId: any;
  checkedInMemberIds: number[] = [];

  constructor(private router: Router,
    private userApi: RegisteredUserApi) {
  }

  ngOnInit() {
    this.roleChecker = new RoleChecker(this.userApi);

  }

  filterSearch(search: string) {
    if (!search) {

      search = "";
    }

    //this will trigger ngChanges in child components
    this.filter = search;

  }

  // sort(field: string): void {
  //   /*
  //    If clicked field is already first it flips the asc/desc.
  //    If clicked field is not first, move it to first and set everything asc
  //    */
  //   let firstItem = this.sortOrder[0];
  //   if (field == firstItem[0]) {
  //     firstItem[1] = !firstItem[1];
  //   } else {
  //     const item = this.sortOrder.find(i => i[0] == field);
  //     const index = this.sortOrder.indexOf(item);
  //     this.sortOrder.splice(index);
  //     this.sortOrder.unshift(item);
  //     this.sortOrder.forEach(i => i[1] = true);
  //   }
  //   this.refresh();
  // }



  onNewMemberClick(): void {
    if (this.eventId) {
      this.router.navigateByUrl(`/member/event/${this.eventId}`);
    } else {
      this.router.navigateByUrl("/member");
    }
  }

  handleButtonClick(event: object) {
    if (event['index'] == 0) {
      this.onEditMember(event['memberid'])
    }
  }

  onEditMember(memberId: any): void {
    const url = this.eventId ? `/member/${memberId}/event/${this.eventId}` : `/member/${memberId}`;
    this.router.navigateByUrl(url);
  }

  onFilteredMemberClick(memberId: any): void {
    console.log("caught: " + memberId)
  }

}
