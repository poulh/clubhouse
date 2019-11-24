import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteredMembersComponent } from './filtered-members.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    SharedModule

  ],
  exports: [
    FilteredMembersComponent
  ],
  declarations: [FilteredMembersComponent]
})
export class FilteredMembersModule { }
