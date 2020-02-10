import { Component, OnInit, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MemberApi } from '../../../sdk/services';
import { Member } from '../../../sdk/models';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'filtered-members',
  templateUrl: './filtered-members.component.html',
  styleUrls: ['./filtered-members.component.scss']
})
export class FilteredMembersComponent implements OnInit {
  @Output() onLoading = new EventEmitter();
  @Output() onButtonClick = new EventEmitter();

  @Input() eventId: any = null;

  @Input() name: string = "Unnamed";
  @Input() buttonText: string = "";
  @Input() queryFilter: object = {}
  @Input() filter: string = "";
  @Input() buttons: object[];

  filteredMembers: Member[] = [];
  membersCache: String[] = []

  members: Member[] = [];
  resultText: string;
  displayMembers: Member[];
  currentFilter: string = ""
  displayResultCountIfZero: boolean = true;

  constructor(private memberApi: MemberApi) { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty("queryFilter")) {
      const queryFilterChange = changes["queryFilter"]
      const queryFilter = queryFilterChange.currentValue
      let source = this.memberApi.find<Member>(queryFilter).pipe(
        finalize(() => {
          // we always update the count and emit isLoading(false)
          this.updateMembersFoundCount()
          this.emitIsLoading(false);
        })
      )

      if (changes.hasOwnProperty("filter")) {
        const filterChange = changes["filter"]
        const filterValue = filterChange.currentValue
        this.displayResultCountIfZero = false;
        source = source.pipe(
          finalize(() => {
            // if we have a filter we create a cache
            this.generateMembersCache(this.members);
            this.applyFilter(filterValue)
          })
        )
      }

      this.emitIsLoading(true);
      source.subscribe(members => {
        this.members = members;
        this.displayMembers = members
      });
    } else if (changes.hasOwnProperty("filter")) {
      const filterChange = changes["filter"]
      const filterValue = filterChange.currentValue
      this.applyFilter(filterValue)
      this.updateMembersFoundCount()
    }
  }

  emitIsLoading(val: boolean) {
    this.onLoading.emit(val);
  }

  updateMembersFoundCount(): void {
    const numToDisplay = this.displayMembers.length;
    if (numToDisplay == 0) {
      this.resultText = "No Members Found"
    } else if (numToDisplay == 1) {
      this.resultText = "1 Member Found"

    } else {
      this.resultText = numToDisplay + " Members Found"
    }
  }

  generateMembersCache(members: Member[]): void {
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

  applyFilter(filter: string): void {
    if (!filter) {
      filter = ""
    }

    this.currentFilter = filter

    if (filter.length == 0) {
      this.displayMembers = []
      return
    }

    filter = filter.toLowerCase();

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
    this.displayMembers = filteredMembers
  }

  emitOnButtonClick(memberid: any, index: number): void {
    this.onButtonClick.emit({ memberid: memberid, index: index })
  }

}
