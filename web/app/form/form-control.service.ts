import { Injectable }   from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from './form.base';

@Injectable()
export class FormControlService {

    toFormGroup(items: FormBase<string>[] ): FormGroup {
        let group: any = {};

        items.forEach((item: any) => {
            group[item.key] = item.required ? new FormControl(item.value || '', Validators.required)
                : new FormControl(item.value || '');
        });
        return new FormGroup(group);
    }
}
