import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Event } from '../../../sdk/models';
import { EventApi } from '../../../sdk/services';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {

  @Input() event: Event | null;
  error: string;

  constructor(private route: ActivatedRoute,
    private eventApi: EventApi,
    private location: Location) { }

  ngOnInit() {
    this.getEvent();
  }

  getEvent(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    if (id) {
      let query = {
        id: id
      };

      this.eventApi.findOne<Event>({ where: query }).subscribe(event => {
        this.event = event
      }, error => {
        console.error(`findOne<Event> error: ${error}`);
        this.error = error;
      });
    } else {
      // this.event = new Event();
    }
  }

  goBack(): void {
    this.location.back();
  }
}
