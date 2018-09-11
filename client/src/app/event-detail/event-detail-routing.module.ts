import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

import { EventDetailsComponent } from '@app/event-detail/event-detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'event/{id}', component: EventDetailsComponent, data: { title: extract('Event Details') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventDetailsRoutingModule { }
