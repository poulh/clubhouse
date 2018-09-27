import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

import { CheckedInMembersComponent } from '@app/checked-in-members/checked-in-members.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  event: Event | null;
  oldEvent: Event;
  error: string;
  isLoading = false;
  @Input() calendarDate: { year: number, month: number, day: number };
  oldCalendarDate: { year: number, month: number, day: number };

  constructor(private route: ActivatedRoute,
    private eventApi: EventApi,
    private location: Location) { }

  ngOnInit() {
    this.getEvent();
  }

  setEventModel(event: Event) {
    this.event = event;
    const eventDate = new Date(this.event.date.toString());
    this.calendarDate = { year: eventDate.getFullYear(), month: eventDate.getMonth() + 1, day: eventDate.getDate() };

    this.oldEvent = new Event(event);
    const oldEventDate = new Date(this.oldEvent.date.toString());
    this.oldCalendarDate = { year: oldEventDate.getFullYear(), month: oldEventDate.getMonth() + 1, day: oldEventDate.getDate() };

    this.isLoading = false;
  }

  noEventChanges(): boolean {
    const noChanges = (JSON.stringify(this.event) === JSON.stringify(this.oldEvent)) &&
      (JSON.stringify(this.calendarDate) === JSON.stringify(this.oldCalendarDate));
    return noChanges;
  }

  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;

      this.eventApi.findById(id).subscribe((event: Event) => {
        this.setEventModel(event);
      }, error => {
        console.error(`findOne<Event> error: ${error}`);
        this.error = error;
      });
    } else {

      let event = new Event();
      event.name = "";
      event.date = new Date();
      this.setEventModel(event);
    }
  }

  updateEvent(): void {
    this.isLoading = true;

    let eventDate = new Date(this.event.date.toString());
    eventDate.setFullYear(this.calendarDate.year);
    eventDate.setMonth(this.calendarDate.month - 1);
    eventDate.setDate(this.calendarDate.day);
    this.event.date = eventDate;
    this.eventApi.replaceOrCreate<Event>(this.event).subscribe(event => {
      return this.setEventModel(event);
    });
  }

  deleteEvent(): void {
    this.eventApi.deleteById<Event>(this.event.id).subscribe(event => {
      this.goBack();
    });
  }

  goBack(): void {
    this.location.back();
  }
}
