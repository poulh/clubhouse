import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Member } from '../../../sdk/models';
import { MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  isLoading = false;
  members: Member[];
  sortOrder: [string, boolean][] = [];
  search: string;

  constructor(private router: Router,
    private memberApi: MemberApi) {
    this.search = "";
    this.sortOrder = [["lastName", true], ["firstName", true]];
  }

  ngOnInit() {
    this.getMembers();
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
    this.getMembers();
  }

  clearSearch(): void {
    this.search = "";
  }

  displayMember(member: Member): boolean {
    if (this.search.length == 0) {
      return true;
    }

    return (member.firstName && member.firstName.toLowerCase().includes(this.search)) ||
      (member.lastName && member.lastName.toLowerCase().includes(this.search)) ||
      (member.email && member.email.toLowerCase().includes(this.search)) ||
      (member.cellPhone && member.cellPhone.toLowerCase().includes(this.search));
  }

  getMembers(): void {
    this.isLoading = true;

    const orderQueryString = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");
    const filter = {
      order: orderQueryString
    };
    this.memberApi.find<Member>(filter).subscribe(members => {
      this.members = members;
      this.isLoading = false;
    });
  }


  onNewMemberClick(): void {
    this.router.navigateByUrl("/member");
  }


}
