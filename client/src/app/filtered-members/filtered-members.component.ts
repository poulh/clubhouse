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

  @Input() eventId: any = null;
  @Input() queryFilter: object = {}
  @Input() buttonText: string = "";

  allMembers: Member[];
  filteredMembers: Member[] = [];
  membersCache: String[];
  sortOrder: [string, boolean][] = [["lastName", true], ["firstName", true]];
  checkedInMemberIds: number[] = [];
  orderQueryString: string = this.sortOrder.map(i => (i[0] + " " + (i[1] ? "ASC" : "DESC"))).join(", ");
  filter: string;

  // allMembers: Member[];
  members: Member[] = [];

  queryFilter2: object = {
    order: this.orderQueryString,
    where: {
      id: {
        nin: this.checkedInMemberIds
      }
    }
  };
  resultText: string;

  constructor(
    private userApi: RegisteredUserApi,
    private memberApi: MemberApi,
    private checkinApi: CheckinApi) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.queryFilter) {
      let queryFilter = changes.queryFilter.currentValue
      console.log(queryFilter)
      this.findMembers(queryFilter)
    }
    else {
      console.log("no change")
    }
  }

  emitIsLoading(val: boolean) {
    this.onLoading.emit(val);
  }

  addWhereClause(q: object) {
    this.queryFilter['where'] = { ...this.queryFilter['where'], q };
  }

  findMembers(queryFilter: object): void {
    this.emitIsLoading(true);

    console.log("filter is: " + queryFilter);
    this.memberApi.find<Member>(queryFilter).subscribe(members => {
      this.members = members;
      console.log(this.members)
      this.updateResultText()
      this.buildFilterCache(this.members);

      this.emitIsLoading(false);
    });
  }

  updateResultText(): void {
    if (this.members.length == 0) {
      this.resultText = "No Members Found"

    } else if (this.members.length == 1) {
      this.resultText = "1 Member Found"

    } else {
      this.resultText = this.members.length + " Members Found"
    }
  }

  buildFilterCache(members: Member[]): void {
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
    console.log(this.membersCache)
  }

  applyFilter(filter: string) {
    if (!filter) {
      filter = "";
    }
    this.filter = filter.toLowerCase();

    console.log("search: " + filter)
    if (this.filter.length == 0) {
      console.log("search empty")
      return;
    }
    this.filterResults();
  }

  filterResults(): void {

    const wordsInFilter = this.filter.toLowerCase().split(" ");
    let filteredMembers: Member[] = [];
    this.membersCache.forEach((cache, index) => {
      //every word in words array must be in the cache to hit
      const match = wordsInFilter.every(word => {
        return cache.includes(word);
      });

      if (match) {
        filteredMembers.push(this.allMembers[index]);
      }
    });

    this.filteredMembers = filteredMembers;
  }

  emitButtonClick(memberid: any): void {
    console.log("click: " + memberid)
    this.onButtonClick.emit(memberid)
  }

}
