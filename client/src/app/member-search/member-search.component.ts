import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'member-search',
  templateUrl: './member-search.component.html',
  styleUrls: ['./member-search.component.scss']
})
export class MemberSearchComponent implements OnInit {

  constructor() { }

  @Input() disabled: boolean = false;
  @Input() placeholder: string = "Search";

  @ViewChild('searchInput') private searchInput: ElementRef;
  @Output() onSearch = new EventEmitter();

  search: string = "";

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.searchInput.nativeElement.focus(), 0);
  }

  setSearch(s: string): void {
    this.search = s;
    this.emitSearchEvent();
  }

  clearSearch(): void {
    this.setSearch("");
    this.setFocus();
  }

  emitSearchEvent(event?: any) {
    if (!this.search) {
      console.log("null search")
      this.search = "";
    }
    console.log("emitting: '" + this.search + "'");
    this.onSearch.emit(this.search);
  }


}
