import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CheckedInMembersComponent } from '@app/checked-in-members/checked-in-members.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CheckedInMembersComponent
  ],
  declarations: [CheckedInMembersComponent]
})
export class CheckedInMembersModule { }
