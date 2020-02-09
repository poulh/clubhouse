import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Checkin, Member } from '../../../sdk/models';
import { CheckinApi, MemberApi, RegisteredUserApi } from '../../../sdk/services';

import { RoleChecker } from '@app/shared';
import { generate } from 'rxjs';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit, AfterViewInit {

  @Input() member: Member;
  @ViewChild("firstName") firstNameField: ElementRef;
  @ViewChild("email") emailField: ElementRef;
  @ViewChild("mobile") mobileField: ElementRef;

  oldMember: Member;

  roleChecker: RoleChecker;

  error: string;
  isLoading = false;

  noEmailAddress = false;
  eventId: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userApi: RegisteredUserApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi,
    private location: Location) {
  }

  ngOnInit() {
    this.roleChecker = new RoleChecker(this.userApi);
    this.getMember();
  }

  ngAfterViewInit() {
    this.setFocus(this.firstNameField)
  }

  getMember(): void {
    this.eventId = this.route.snapshot.paramMap.get('eventId');
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;

      const query = {
        where: {
          id: id
        }
      };

      this.memberApi.findOne<Member>(query)
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

  generateNoEmailAddress(): string {
    //this.scrubMember();
    let firstName =  this.member.firstName.replace(/[^a-z]/gi, '')
    let lastName =  this.member.lastName.replace(/[^a-z]/gi, '')

    let generatedEmail = firstName + "." + lastName + "@noemail.com";
    generatedEmail = generatedEmail.toLowerCase();
    console.log("generated: " + generatedEmail)
    return generatedEmail
  }

  setFocus(elem:ElementRef) : void {
    setTimeout(() => elem.nativeElement.focus(), 0);
  }

  toggleNoEmail(): void {
    this.noEmailAddress = !this.noEmailAddress
    if(this.noEmailAddress) {
      this.member.email = this.generateNoEmailAddress()
    } else {
      this.member.email = '';
      //this.emailField.nativeElement.focus()
      this.setFocus(this.emailField)
    }
  }
  scrubMember(): void {
    this.member.firstName = this.member.firstName.trim();
    this.member.lastName = this.member.lastName.trim();
    if( this.noEmailAddress ) {
      this.member.email = this.generateNoEmailAddress()  
    }
    else {
      this.member.email = this.member.email.trim().toLowerCase();
    }
  }

  updateMember(): void {
    this.isLoading = true;

    this.scrubMember();

    const updateMemberObserver = {
      next: (member: Member) => {
        console.log('Observer got a next value: ' + member);
        this.setMemberModel(member);
        if (this.eventId) {
          const data = {
            date: new Date(), //todo: this should be set on the server
            memberId: this.member.id,
            eventId: this.eventId
          };

          this.checkinApi.create(data).subscribe((checkin: Checkin) => {
            this.goBack();
          });
        } else {
          this.goBack();
        }
      },
      error: (err: any) => {
        console.log('Observer got an error: ' + err);
      },
      complete: () => console.log('Observer got a complete notification'),
    };

    this.memberApi.replaceOrCreate<Member>(this.member)
      .subscribe(updateMemberObserver);
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

  stringEmpty(str: string): boolean {
    return str.length == 0
  }

  invalidEmailAddress() : boolean {
    let emailAdressRequired = !this.noEmailAddress
    return emailAdressRequired == true &&  this.stringEmpty(this.member.email)
  }
  noFullName(): boolean {
    let rval =  (this.stringEmpty(this.member.firstName) || this.stringEmpty(this.member.lastName));
    return rval
  }

  noMemberChanges(): boolean {
    const noChanges = JSON.stringify(this.member) === JSON.stringify(this.oldMember);
    return noChanges;
  }

  noCreateOrUpdate(): boolean {
    return this.noMemberChanges() || this.noFullName() || this.invalidEmailAddress()
  }

  goBack(): void {
    this.location.back();
  }

}
