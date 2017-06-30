import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AuthService, ContextButton, SetContextButtonsAction } from 'mh-core';
import * as app from '../../app.store';
import { Interaction, Person, TitleService, AddInteractionAction } from 'mh-core';

@Component({
  selector: 'mh-interaction-create',
  templateUrl: './interaction-create.component.html',
  styleUrls: ['./interaction-create.component.scss', '../interaction-common.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionCreateComponent implements OnInit, OnDestroy {

  private _alive: boolean = true;
  private _authorId: string;
  private _refPerson: Person;

  form: FormGroup;
  refInteraction: Interaction;

  returnToRoute: string;
  showTypeSelector: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  error: string;

  people$: Observable<Person[]>;
  options: any = {};

  constructor(titleService: TitleService,
              private _fb: FormBuilder,
              private _auth: AuthService,
              private _store: Store<app.AppState>,
              private _location: Location) {
    titleService.setTitle('Create Interaction');
    this.people$ = this._store.select(app.getPeople);
    this._store.select(app.getAuthPersonId)
        .takeWhile(() => this._alive)
        .subscribe((uid: string) => this._authorId = uid);
    this._store.select(app.getSelectedPerson)
        .takeWhile(() => this._alive)
        .subscribe((p: Person) => this._refPerson = p);

    // TODO: move these settings
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
    this.form = this._fb.group({
      text: [undefined, [<any>Validators.required]],
      type: [undefined, [<any>Validators.required]],
      owner: [undefined, [<any>Validators.required]],
      recipients: [undefined, [<any>Validators.required]],
      dueOn: [undefined],
      private: [undefined]
    });
    this.initDefaults();
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  toggleTypes(): void {
    if (this.showTypeSelector && !this.form.dirty) {
      this.form.reset();
      this.showTypeSelector = false;
      this.initDefaults();
    } else {
      this.showTypeSelector = true;
    }
  }

  returnRoute(): void {
    this._location.back();
  }

  clearForm(): void {
    this.form.reset();
    this.showTypeSelector = false;
    this.initDefaults();
  }

  save(model: Interaction, isValid: boolean): void {
    if (isValid) {
      model.authorId = this._authorId;
      this._store.dispatch(new AddInteractionAction(model));
      this.form.reset();
      this.returnRoute();
    }
  }

  private initDefaults(): void {
    // this._refPerson = this._interactionService.getPersonInteractiond();
    // this.refInteraction = this._interactionService.getInteraction();
    // this.returnToRoute = this._interactionService.getLastRoute();

    if (this.form && this._authorId) {
      this.form.get('recipients').setValue([this._authorId]);
    }
    // person related interaction
    if (this._refPerson && this._refPerson !== undefined) {
      this.form.get('owner').setValue(this._refPerson.uid);
    }
    /*
    if (this.dialogData.interaction) {
      this.interaction = this.dialogData.interaction;
      this.form.get('owner').setValue(this.interaction.refId);
      this.form.get('text').setValue(this.interaction.text);
      this.form.get('type').setValue(this.interaction.typeId);
      this.form.get('recipients').setValue(this.interaction.recipients);
      this.editMode = true;
    }
    // birthday interactions
    if (this.dialogData.person) {
      this._refPerson = this.dialogData.person;
      this.form.get('owner').setValue(this._refPerson.uid);
      this.form.get('dueOn').setValue(this._refPerson.birthday);
    }*/
  }

  private _setContextMenu(): void {
    let buttons: ContextButton[] = [];
    // buttons.push({icon: 'people', link: '/person', title: 'LIST PEOPLE'});
    buttons.push({icon: 'people', link: '/person', title: 'LIST PEOPLE'});

    this._store.dispatch(new SetContextButtonsAction(buttons));
  }

}
