import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonService } from '../../person/person.service';
import { Person } from 'mh-core';

import { Interaction, InteractionType } from '../interaction';
import * as intsrv from '../interaction.service';
import { InteractionService } from '../../common/interaction.service';

import { AuthService } from 'mh-core';
import { ShoutService } from '../../common/shout.service';

@Component({
  selector: 'mh-interaction-create',
  templateUrl: './interaction-create.component.html',
  styleUrls: ['./interaction-create.component.scss', '../interaction-common.styles.scss']
})
export class InteractionCreateComponent implements OnInit {

  private _author: Person;
  private _refPerson: Person;

  interactionForm: FormGroup;
  interactionTypes: Array<InteractionType>;
  refInteraction: Interaction;

  returnToRoute: string;

  allowedContacts: Array<Person>;

  showTypeSelector: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  error: string;

  constructor(private _fb: FormBuilder,
              private _personService: PersonService,
              private _intService: intsrv.InteractionService,
              private _auth: AuthService,
              private _shout: ShoutService,
              private _interactionService: InteractionService,
              private _router: Router) {
    this._intService.getInteractionTypes() // TODO: move this into the options table
        .subscribe((types: Array<InteractionType>) => {
          this.interactionTypes = types;
        });
    this._author = this._auth.getCurrentUser();
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

  keyupHandlerFunction(event: any): void {
    // console.log('interaction-list', event);
  }

  clearForm(): void {
    this.interactionForm.reset();
    this.showTypeSelector = false;
    this.initDefaults();
  }

  save(model: Interaction, isValid: boolean): void {
    if (isValid) {
      model.authorId = this._author.uid;
      this._interactionService.create(model);
      this.interactionForm.reset();
      if (this.returnToRoute !== '') {
        this._router.navigate([this.returnToRoute]);
      }
    }
  }

  private initDefaults(): void {
    // this._refPerson = this._interactionService.getPersonInteractiond();
    // this.refInteraction = this._interactionService.getInteraction();
    this.returnToRoute = this._interactionService.getLastRoute();

    if (this.interactionForm && this._author) {
      this.interactionForm.get('recipients').setValue([this._author.uid]);
    }
    // person related interaction
    if (this._refPerson && this._refPerson !== undefined) {
      this.interactionForm.get('owner').setValue(this._refPerson.uid);
    }
    /*
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
    }*/
  }

}