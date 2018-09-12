import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Member } from '../../../sdk/models';
import { MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  @Input() member: Member;
  oldMember: Member;
  error: string;
  isLoading = false;

  constructor(private route: ActivatedRoute,
    private memberApi: MemberApi,
    private location: Location) { }

  ngOnInit() {
    this.getMember();
  }

  getMember(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;

      let query = {
        id: id
      };

      this.memberApi.findOne<Member>({ where: query })
        .subscribe(member => {
          this.setMemberModel(member);
        }, error => {
          console.error(`findOne<Member> error: ${error}`);
          this.error = error;
        });
    } else {

      // this.member = new Member();
    }
  }

  updateMember(): void {
    this.isLoading = true;

    this.memberApi.updateAttributes(this.member.id, this.member).subscribe(member => this.setMemberModel(member));
  }

  setMemberModel(member: Member) {
    this.member = member;
    this.oldMember = new Member(member);

    this.isLoading = false;
  }

  noMemberChanges(): boolean {
    const noChanges = JSON.stringify(this.member) === JSON.stringify(this.oldMember);
    return noChanges;
  }

  goBack(): void {
    this.location.back();
  }

}
