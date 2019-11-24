import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredMembersComponent } from './filtered-members.component';

describe('FilteredMembersComponent', () => {
  let component: FilteredMembersComponent;
  let fixture: ComponentFixture<FilteredMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
