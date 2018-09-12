import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

import { MemberDetailComponent } from '@app/member-detail/member-detail.component';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'member/:id', component: MemberDetailComponent, data: { title: extract('Member Details') } }
  ])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberDetailRoutingModule { }
