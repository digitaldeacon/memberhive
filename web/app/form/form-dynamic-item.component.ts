import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { FormBase }     from './form.base';
@Component({
    selector: 'mh-fd-items',
    templateUrl: './form-dynamic-item.component.html'
})
export class FormDynamicItemComponent {
    @Input() item: FormBase<any>;
    @Input() form: FormGroup;
    get isValid(): boolean {
        console.log(this.item);
        return true;//this.form.controls[this.item.key].valid;
    }
}
