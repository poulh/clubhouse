import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCheckinComponent } from './event-checkin.component';

describe('EventCheckinComponent', () => {
  let component: EventCheckinComponent;
  let fixture: ComponentFixture<EventCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
