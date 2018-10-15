import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Checkin, Member } from '../../../sdk/models';
import { CheckinApi, MemberApi } from '../../../sdk/services';

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
  eventId: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi,
    private location: Location) {
  }

  ngOnInit() {
    this.getMember();
  }

  getMember(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    const id = this.route.snapshot.paramMap.get('id');
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
      let member = new Member();
      member.firstName = "";
      member.lastName = "";
      member.mobilePhone = "";
      member.email = "";
      this.setMemberModel(member);
    }
  }

  updateMember(): void {
    this.isLoading = true;

    this.memberApi.replaceOrCreate<Member>(this.member)
      .subscribe(member => {
        this.setMemberModel(member);
        if (this.eventId) {
          const data = {
            date: new Date(), //todo: this should be set on the server
            memberId: this.member.id,
            eventId: this.eventId
          };

          this.checkinApi.create(data).subscribe((checkin: Checkin) => {
            this.goBack();
          })
        }
      });
  }

  deleteMember(): void {
    this.memberApi.deleteById<Member>(this.member.id).subscribe(member => {
      this.goBack();
    });
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
