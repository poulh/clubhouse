import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Event[];

  constructor(private router: Router,
    private eventApi: EventApi) { }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {
    const filter = {
      order: 'date DESC'
    };

    this.eventApi.find<Event>(filter).subscribe(events => this.events = events);
  }

  onCheckinClick(event: Event): void {
    this.router.navigateByUrl(`/checkin/${event.id}`);
    console.log(event);
  }

  onNewEventClick(): void {
    this.router.navigateByUrl("/event");
  }

}
