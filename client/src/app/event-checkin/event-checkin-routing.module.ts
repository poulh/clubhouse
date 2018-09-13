import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

import { EventCheckinComponent } from '@app/event-checkin/event-checkin.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'checkin/:id', component: EventCheckinComponent, data: { title: extract('Event Details') } }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventCheckinRoutingModule { }
