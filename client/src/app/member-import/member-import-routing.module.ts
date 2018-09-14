import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { Shell } from '@app/shell/shell.service';

import { MemberImportComponent } from '@app/member-import/member-import.component';

const routes: Routes = [Shell.childRoutes([
  { path: 'import', component: MemberImportComponent, data: { title: extract('Member Import') } },
])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberImportRoutingModule { }
