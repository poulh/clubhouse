import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RoleChecker } from '@app/shared';

import { Event } from '../../../sdk/models';
import { EventApi, RegisteredUserApi } from '../../../sdk/services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  roleChecker: RoleChecker;

  isLoading = false;
  events: Event[];

  constructor(private router: Router,
    private userApi: RegisteredUserApi,
    private eventApi: EventApi) {
    this.roleChecker = new RoleChecker(userApi);
  }

  ngOnInit() {
    this.getEvents();
  }

  getEvents(): void {

    this.isLoading = true;
    const filter = {
      order: 'date DESC'
    };

    this.eventApi.find<Event>(filter).subscribe(events => {
      this.events = events;
      this.isLoading = false;
    });
  }

  onCheckinClick(event: Event): void {
    this.router.navigateByUrl(`/checkin/${event.id}`);
    console.log(event);
  }

  onNewEventClick(): void {
    this.router.navigateByUrl("/event");
  }

}
