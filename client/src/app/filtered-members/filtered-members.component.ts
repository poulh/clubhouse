import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CheckinApi, MemberApi, RegisteredUserApi } from '../../../sdk/services';
import { Checkin, Member } from '../../../sdk/models';
import { query } from '@angular/core/src/render3/query';


@Component({
  selector: 'filtered-members',
  templateUrl: './filtered-members.component.html',
  styleUrls: ['./filtered-members.component.scss']
})
export class FilteredMembersComponent implements OnInit {
  @Output() onLoading = new EventEmitter();
  @Output() onButtonClick = new EventEmitter();

  @Input() eventId: any = null; //todo: remove

  @Input() buttonText: string = "";
  @Input() queryFilter: object = {}
  @Input() filter: string = "";

  filteredMembers: Member[] = [];
  membersCache: String[];
  sortOrder: [string, boolean][] = [["lastName", true], ["firstName", true]];
  checkedInMemberIds: number[] = [];
  orderQueryString: string = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");


  members: Member[] = [];
  resultText: string;
  displayMembers: Member[];

  constructor(
    private userApi: RegisteredUserApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    const keys = Object.keys(changes)
    keys.forEach((key) => {

      const val = changes[key].currentValue

      if (key == "queryFilter") {
        this.findMembers(val)
      }

      if (key == "filter") {
        this.applyFilter(val)
      }
    })

  }

  setQueryFilter(queryFilter: object): void {
    this.findMembers(queryFilter)
  }

  emitIsLoading(val: boolean) {
    this.onLoading.emit(val);
  }

  addWhereClause(q: object) {
    this.queryFilter['where'] = { ...this.queryFilter['where'], q };
  }

  findMembers(queryFilter: object): void {
    this.emitIsLoading(true);

    this.memberApi.find<Member>(queryFilter).subscribe(members => {
      this.members = members;

      this.generateFilterCache(this.members);
      this.setDisplayMembers(this.members)

      this.emitIsLoading(false);
    });
  }

  setDisplayMembers(members: Member[]): void {
    this.displayMembers = members
    this.updateResultText(this.displayMembers)
  }

  updateResultText(members: Member[]): void {
    if (members.length == 0) {
      this.resultText = "No Members Found"

    } else if (members.length == 1) {
      this.resultText = "1 Member Found"

    } else {
      this.resultText = members.length + " Members Found"
    }
  }

  generateFilterCache(members: Member[]): void {
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
  }

  applyFilter(filter: string) {
    if (!filter) {
      filter = "";
    }

    if (filter.length == 0) {
      this.setDisplayMembers(this.members);
      return
    }

    filter = filter.toLowerCase();

    this.filterResults(filter);
  }

  filterResults(filter: string): void {
    const wordsInFilter = filter.toLowerCase().split(" ");
    let filteredMembers: Member[] = [];
    this.membersCache.forEach((cache, index) => {
      //every word in words array must be in the cache to hit
      const match = wordsInFilter.every(word => {
        return cache.includes(word);
      });

      if (match) {
        filteredMembers.push(this.members[index]);
      }
    });

    this.setDisplayMembers(filteredMembers)

    //this.filteredMembers = filteredMembers;
  }

  emitButtonClick(memberid: any): void {
    this.onButtonClick.emit(memberid)
  }

}
