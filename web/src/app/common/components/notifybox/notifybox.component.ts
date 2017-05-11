import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mh-notifybox',
  templateUrl: './notifybox.component.html',
  styleUrls: ['./notifybox.component.scss']
})
export class NotifyboxComponent implements OnInit {

    @Input() message: any;
    @Input() type: string;

    constructor() { }

    ngOnInit() {
    }

    boxClass(): string {
        if (this.type === 'error') {
            return 'error';
        }
        return 'error';
    }
}
