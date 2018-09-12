import { Component, OnInit } from '@angular/core';

import { Member } from '../../../sdk/models';
import { MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(private memberApi: MemberApi) { }

  ngOnInit() {
    this.getMembers();
  }

  getMembers(): void {
    this.memberApi.find<Member>().subscribe(members => this.members = members);
  }

}
