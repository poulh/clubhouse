import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Member } from '../../../sdk/models';
import { MemberApi } from '../../../sdk/services';

@Component({
  selector: 'app-member-import',
  templateUrl: './member-import.component.html',
  styleUrls: ['./member-import.component.scss']
})
export class MemberImportComponent implements OnInit {

  isLoading: false;
  requiredProperties: string[];

  constructor(private location: Location,
    private memberApi: MemberApi) { }

  ngOnInit() {
    this.requiredProperties = Object.keys(Member.getModelDefinition().properties); // pop last item ( id );
    this.requiredProperties.pop();
  }

  fileChange(event: any): void {

    const [file] = event.target.files;
    console.log(file);

    let reader: FileReader = new FileReader();

    let memberApi = this.memberApi;
    let self = this;
    reader.onload = function (e: any) {
      const contents = e.target.result;
      console.log(e.target);

      memberApi.import({ data: contents }).subscribe(result => {
        console.log(result);
        self.goBack();
      });
    }

    reader.readAsText(file);
  }

  goBack(): void {
    this.location.back();
  }

}

