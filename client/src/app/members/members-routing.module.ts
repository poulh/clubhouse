import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';
import { MembersComponent } from './members.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'members', component: MembersComponent, data: { title: extract('Members') } }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembersRoutingModule { }
