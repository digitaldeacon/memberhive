import { Component, OnInit } from '@angular/core';
import { TitleService, Person } from 'mh-core';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

@Component({
  selector: 'mh-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    personAttr: Array<string> = [
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
    personAttrSelected: Array<string>;

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
        // this.personElements = Object.keys(this.person).map((key)=>{ return key});
      }

    private onDropModel(args: any): void {
        let [el, target, source] = args;
        // do something else
    }

    private onRemoveModel(args: any): void {
        let [el, source] = args;
        // do something else
    }
}
