import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Interaction } from '../interaction';
import { InteractionService } from '../../common/interaction.service';

import { AuthService } from 'mh-core';
import * as app from '../../app.store';
import { Person, TitleService } from 'mh-core';

import { ShoutService } from '../../common/shout.service';

@Component({
  selector: 'mh-interaction-create',
  templateUrl: './interaction-create.component.html',
  styleUrls: ['./interaction-create.component.scss', '../interaction-common.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionCreateComponent implements OnInit {

  private _authorId: string;
  private _refPerson: Person;

  interactionForm: FormGroup;
  refInteraction: Interaction;

  returnToRoute: string;
  showTypeSelector: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  error: string;

  people$: Observable<Person[]>;
  options: any = {};

  constructor(private _fb: FormBuilder,
              private _auth: AuthService,
              private _shout: ShoutService,
              private _interactionService: InteractionService,
              private _store: Store<app.AppState>,
              private _router: Router) {
    this.people$ = this._store.select(app.getPeople);
    this.options = {
      interaction: {
        types: [
          {type: 'interaction', iconString: 'swap_vertical_circle'},
          {type: 'note', iconString: 'comment'},
          {type: 'meeting', iconString: 'forum'},
          {type: 'email', iconString: 'email'},
          {type: 'phone', iconString: 'contact_phone'}
        ]
      }
    };
    this._authorId = this._auth.getPersonId();
  }

  ngOnInit(): void {
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
      model.authorId = this._authorId;
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

    if (this.interactionForm && this._authorId) {
      this.interactionForm.get('recipients').setValue([this._authorId]);
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
