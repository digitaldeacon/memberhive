import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA, MdButtonToggleChange } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PersonService } from '../../person/person.service';
import { Person } from 'mh-core';

import { Interaction, InteractionType } from '../interaction';
import { InteractionService } from '../interaction.service';

import { AuthService } from 'mh-core';

@Component({
    selector: 'mh-interaction-create-dialog',
    templateUrl: './interaction-create.dialog.html',
    styleUrls: ['./interaction-create.dialog.scss', '../interaction-common.styles.scss']
})
export class InteractionCreateDialogComponent implements OnInit {
    private _authorId: string;
    private _refPerson: Person;

    interactionForm: FormGroup;
    interactionTypes: Array<InteractionType>;
    interaction: Interaction;

    allowedContacts: Array<Person>;

    showTypeSelector: boolean = false;
    submitted: boolean = false;
    editMode: boolean = false;
    error: string;

    constructor(private _fb: FormBuilder,
                private _personService: PersonService,
                private _interactionService: InteractionService,
                private _auth: AuthService,
                private _dialogRef: MdDialogRef<InteractionCreateDialogComponent>,
                @Inject(MD_DIALOG_DATA) public dialogData: any) {
        this._interactionService.getInteractionTypes() // TODO: move this into the options table
            .subscribe((types: Array<InteractionType>) => {
                this.interactionTypes = types;
            });
        this._authorId = this._auth.getPersonId();
    }

    ngOnInit(): void {
        this.getAllowedContacts();
        this.interactionForm = this._fb.group({
            text: [undefined, [<any>Validators.required]],
            type: [undefined, [<any>Validators.required]],
            owner: [undefined, [<any>Validators.required]],
            recipients: [undefined, [<any>Validators.required]],
            dueOn: [undefined],
            private: [undefined]
        });
        this.initDefaults();
    }

    getAllowedContacts(): void {
        // TODO: get only those users that I can select
        this._personService.getPersons()
            .subscribe((people: Array<Person>) => this.allowedContacts = people);
    }

    toggleTypes(): void {
        if (this.showTypeSelector && !this.interactionForm.dirty) {
            this.interactionForm.reset();
            this.showTypeSelector = false;
            this.initDefaults();
        } else {
            this.showTypeSelector = true;
        }
    }

    toggleFields(event: MdButtonToggleChange): void {
        if (event.value === 'interaction') {
            // show interaction fields here
        }
    }

    keyupHandlerFunction(event: any): void {
        // console.log('interaction-list', event);
    }

    clearForm(): void {
        this.interactionForm.reset();
        this.showTypeSelector = false;
        this.initDefaults();
    }

    save(model: Interaction, isValid: boolean): void {
        this.submitted = true;
        this.showTypeSelector = false;
        if (isValid) {
            model.authorId = this._authorId;
            if (this.dialogData.interaction) {
                model.uid = this.dialogData.interaction.uid;
            }
            this._interactionService.createInteractionPerson(model)
                .subscribe(
                    (interaction: Interaction) => {
                        this.interactionForm.reset();
                        this._dialogRef.close(interaction);
                        return true;
                    },
                    (error: any) => {
                        this.error = error;
                        return false;
                    }
                );
        }
    }

    private initDefaults(): void {
        if (this.interactionForm && this._authorId && !this.dialogData.interaction) {
            this.interactionForm.get('recipients').setValue([this._authorId]);
        }
        // person related interaction
        if (this.dialogData.id && !this.dialogData.interaction) {
            this.interactionForm.get('owner').setValue(this.dialogData.id);
        }
        if (this.dialogData.interaction) {
            this.interaction = this.dialogData.interaction;
            this.interactionForm.get('owner').setValue(this.interaction.ownerId);
            this.interactionForm.get('text').setValue(this.interaction.text);
            this.interactionForm.get('type').setValue(this.interaction.typeId);
            this.interactionForm.get('recipients').setValue(this.interaction.recipients);
            this.editMode = true;
        }
        // birthday interactions
        if (this.dialogData.person) {
            this._refPerson = this.dialogData.person;
            this.interactionForm.get('owner').setValue(this._refPerson.uid);
            this.interactionForm.get('dueOn').setValue(this._refPerson.birthday);
        }
    }
}
