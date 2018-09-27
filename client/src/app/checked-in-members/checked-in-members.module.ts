import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckedInMembersComponent } from '@app/checked-in-members/checked-in-members.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CheckedInMembersComponent
  ],
  declarations: [CheckedInMembersComponent]
})
export class CheckedInMembersModule { }
