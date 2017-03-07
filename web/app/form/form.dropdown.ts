import { FormBase } from './form.base';

export class Dropdown extends FormBase<string> {
    controlType: string = 'dropdown';
    options: {key: string, value: string}[] = [];

    constructor(options: any = {}) {
        super(options);
        this.options = options['options'] || [];
    }
}
