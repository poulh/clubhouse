import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberSearchComponent } from './member-search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MemberSearchComponent
  ],
  declarations: [MemberSearchComponent]
})
export class MemberSearchModule { }
