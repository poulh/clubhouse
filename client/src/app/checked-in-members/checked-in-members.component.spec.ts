import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckedInMembersComponent } from '@app/checked-in-members/checked-in-members.component';

describe('CheckedInMembersComponent', () => {
  let component: CheckedInMembersComponent;
  let fixture: ComponentFixture<CheckedInMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckedInMembersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckedInMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
