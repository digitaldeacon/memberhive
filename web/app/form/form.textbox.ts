import { FormBase } from './form.base';

export class Textbox extends FormBase<string> {
    controlType: string = 'textbox';
    type: string;

    constructor(options: any = {}) {
        super(options);
        this.type = options['type'] || '';
    }
}
