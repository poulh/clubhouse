import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MemberSearchComponent } from '@app/member-search/member-search.component';

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
