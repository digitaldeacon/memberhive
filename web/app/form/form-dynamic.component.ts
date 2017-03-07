import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';
import { FormBase }              from './form.base';
import { FormControlService }    from './form-control.service';
@Component({
    selector: 'mh-form-dynamic',
    templateUrl: './form-dynamic.component.html',
    providers: [ FormControlService ]
})
export class FormDynamicComponent implements OnInit {
    @Input() items: FormBase<any>[] = [];
    form: FormGroup;
    payLoad: string  = '';
    constructor(private fcs: FormControlService) {  }
    ngOnInit(): void {
        console.log(this.items);
        this.form = this.fcs.toFormGroup(this.items);
    }
    onSubmit(): void {
        this.payLoad = JSON.stringify(this.form.value);
    }
}
