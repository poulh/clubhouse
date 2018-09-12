import { Component, OnInit } from '@angular/core';

import { Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private eventApi: EventApi) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    this.eventApi.find<Event>().subscribe(events => this.events = events);
  }

  onCheckinClick(event: Event): void {
    console.log(event);
  }

}
