import { Component, Input } from '@angular/core';

@Component({
  selector: 'mh-notifybox',
  templateUrl: './notifybox.component.html',
  styleUrls: ['./notifybox.component.scss'],
})
export class NotifyboxComponent {
  @Input() message: any;
  @Input() type: string;

  boxClass(): string {
    if (this.type === 'error') {
      return 'error';
    }
    return 'error';
  }
}
