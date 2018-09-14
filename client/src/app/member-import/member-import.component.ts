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

  requiredProperties: string[];

  constructor(private location: Location,
    private memberApi: MemberApi) { }

  ngOnInit() {
    this.requiredProperties = Object.keys(Member.getModelDefinition().properties); // pop last item ( id );
    this.requiredProperties.pop();

  }

  fileChange(event: any): void {

    const fileList: any = event.target.files;
    if (fileList.length > 0) {
      const file: any = fileList[0];
      let reader: FileReader = new FileReader();

      let members: {}[] = [];
      let memberApi = this.memberApi;
      reader.onload = function (e: any) {
        const contents = e.target.result;
        const lines: string[] = contents.split("\n");
        const header: string[] = lines.shift().split(",");

        lines.forEach((line: string) => {
          const parts: string[] = line.split(",");

          let member = {};
          header.forEach((prop: string, idx: number) => {
            member[prop] = parts[idx];
          });
          members.push(member);

        });

        memberApi.createMany<{}>(members).subscribe(mems => {
          console.log(mems);
        })
      }
      reader.readAsText(file);
    }
  }

  goBack(): void {
    this.location.back();
  }

}

