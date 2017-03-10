import {
    Component,
    OnDestroy,
    AfterViewInit,
    Input,
    forwardRef
} from '@angular/core';

import {
    FormControl,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS } from '@angular/forms';

import 'tinymce';
import  '../../../../web/assets/tiny/themes/inlite';
import  '../../../../web/assets/tiny/themes/modern';

import 'tinymce/plugins/table';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/link';

declare var tinymce: any;

// in case we ever want to validate the editor apart from the std validators
// uses validate() of the class
const CUSTOM_INPUT_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TinyMCEComponent),
    multi: true
};
const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TinyMCEComponent),
    multi: true
};

@Component({
    selector: 'mh-tinymce',
    templateUrl: 'tinymce.component.html',
    styleUrls: ['tinymce.component.scss'],
    providers: [
        CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR
    ]
})
export class TinyMCEComponent
    implements AfterViewInit, OnDestroy, ControlValueAccessor {

    @Input()
    _value: any = '';
    @Input() elementId: String;

    editor: any;

    get value(): any { return this._value; };

    set value(v: any) {
        this._value = v;
        this.propagateChange(this._value);
    }

    propagateChange = (_: any) => {
        // dummy function
    }

    writeValue(value: any): void {
        this._value = value;
    }

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        // not used
    }

    validate(c: FormControl): any {
        return (this.value) ? undefined : {
                tinyError: {
                    valid: false
                }
            };
    }

    ngAfterViewInit(): void {
        tinymce.init({
            selector: '#' + this.elementId,
            plugins: ['link', 'paste', 'table'],
            skin_url: '/assets/tiny/skins/lightgray',
            // theme_url: '/assets/tiny/themes/inlite',
            menubar: 'false',
            statusbar: 'false',
            toolbar: 'undo redo | styleselect | bold italic | link',
            content_style: 'body {font-family: Roboto, "Helvetica Neue", sans-serif !important;'
                         + 'color: #202020 !important;}',
            // inline: 'true',
            // theme: 'inlite',
            setup: (editor: any) => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.value = editor.getContent();
                });
            }
        });
    }

    ngOnDestroy(): void {
        tinymce.remove(this.editor);
    }
}
