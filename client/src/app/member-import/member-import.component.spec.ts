import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberImportComponent } from './member-import.component';

describe('MemberImportComponent', () => {
  let component: MemberImportComponent;
  let fixture: ComponentFixture<MemberImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
