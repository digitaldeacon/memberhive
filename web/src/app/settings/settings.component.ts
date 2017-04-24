import { Component, OnInit } from '@angular/core';
import { TitleService, Person } from 'mh-core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    personAttrSet: Array<string> = [
        'fullName',
        'firstName',
        'middleName',
        'lastName',
        'avatar',
        'email',
        'birthday',
        'gender',
        'age',
        'phoneHome',
        'phoneWork',
        'phoneMobile'
    ];
    personAttr: Array<string>;
    personAttrSelected: Array<string> = [
        'email'
    ];

    constructor(titleService: TitleService,
              dragulaService: DragulaService) {
      titleService.setTitle('All Settings');
      dragulaService.dropModel.subscribe((value: any[]) => {
          this.onDropModel(value.slice(1));
      });
      dragulaService.removeModel.subscribe((value: any[]) => {
          this.onRemoveModel(value.slice(1));
      });
    }

    ngOnInit(): void {
        this.personAttr = this.personAttrSet.filter((item) => {
            return this.personAttrSelected.indexOf(item)!==0;
        });
    }

    private onDropModel(args: any): void {
        let [el, target, source] = args;
        // do something else
        console.log(el, target, source, this.personAttrSelected);
    }

    private onRemoveModel(args: any): void {
        let [el, source] = args;
        // do something else
        console.log(el, source, this.personAttrSelected);
    }
}
