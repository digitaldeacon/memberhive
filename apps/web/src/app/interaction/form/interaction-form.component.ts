import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { MatButtonToggleChange } from '@angular/material';

import {
  AppState,
  getPeople,
  getSelectedPerson,
  getInteractions,
  AuthService,
  ContextButton,
  SetContextButtonsAction,
  Interaction,
  Person,
  AddInteractionAction,
  UpdateInteractionAction,
  SetTitleAction
} from '@memberhivex/core';

@Component({
  selector: 'mh-interaction-form',
  templateUrl: './interaction-form.component.html',
  styleUrls: ['./interaction-form.component.scss', '../interaction-common.styles.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InteractionFormComponent implements OnInit, OnDestroy {
  private _alive: boolean = true;
  private _authorId: string;
  private _refPerson: Person;

  form: FormGroup;
  refInteraction: Interaction;

  showTypeSelector: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  error: string;

  people$: Observable<Person[]>;
  options: any = {};
  visibility: any[] = [];
  actionVerbs: any[] = [];

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _store: Store<AppState>,
    private _route: ActivatedRoute,
    private _location: Location
  ) {

    // TODO: @I18n
    this._store.dispatch(new SetTitleAction('Dialog erstellen'));
    this.people$ = this._store.select(getPeople);
    this._store
      .select(getSelectedPerson)
      .takeWhile(() => this._alive)
      .subscribe((p: Person) => (this._refPerson = p));

    // TODO: @I18n
    this.options = {
      interaction: {
        types: [
          { type: 'interaction', label: 'Dialog', iconString: 'swap_vertical_circle' },
          { type: 'note', label: 'Notiz', iconString: 'comment' },
          { type: 'meeting', label: 'Treffen', iconString: 'forum' },
          { type: 'email', label: 'E-Mail', iconString: 'email' },
          { type: 'phone', label: 'Telefon', iconString: 'contact_phone' }
        ]
      }
    };

    // TODO: fetch these from the auth groups DB
    // TODO: @I18n
    this.visibility = [
      { id: 'PRIVATE', text: 'Privat', icon: 'lock' },
      { id: 'SHEPHERD', text: 'Hirten', icon: 'group' },
      { id: 'LEADER', text: 'Leiter', icon: 'group' },
      { id: 'STAFF', text: 'Mitarbeiter', icon: 'group' },
      { id: 'ALL', text: 'Benutzer', icon: 'person' }
    ];

    // TODO: @I18n
    this.actionVerbs = ['call', 'meet', 'follow up', 'schedule', 'do', 'check'];
    this._authorId = this._auth.personId;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      text: [undefined, [<any>Validators.required]],
      type: [undefined, [<any>Validators.required]],
      actionType: [undefined],
      refId: [undefined, [<any>Validators.required]],
      recipients: [undefined],
      dueOn: [undefined],
      visibility: ['LEADER', [<any>Validators.required]]
    });
    this.initDefaults();
  }

  ngOnDestroy(): void {
    this._alive = false;
  }

  toggleTypes(event: MatButtonToggleChange): void {
    const actionTypeCtrl: any = (<any>this.form).get('type');
    const recipientsCtrl: any = (<any>this.form).get('recipients');
    const refIdCtrl: any = (<any>this.form).get('refId');
    if (actionTypeCtrl.value === 'interaction') {
      actionTypeCtrl.setValidators(<any>Validators.required);
      recipientsCtrl.setValidators(<any>Validators.required);
      refIdCtrl.setValidators(undefined);
    } else {
      actionTypeCtrl.setValidators(undefined);
      recipientsCtrl.setValidators(undefined);
      refIdCtrl.setValidators(<any>Validators.required);
    }
    actionTypeCtrl.updateValueAndValidity();
    recipientsCtrl.updateValueAndValidity();
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
      model.author = {
        id: this._authorId
      };
      if (!this.editMode) {
        this._store.dispatch(new AddInteractionAction(model));
      } else {
        model.uid = this.refInteraction.uid;
        this._store.dispatch(new UpdateInteractionAction(model));
      }
      this.form.reset();
      this.returnRoute();
    }
  }

  private initDefaults(): void {
    const id: string = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._store
        .select(getInteractions)
        .take(1)
        .subscribe((interaction: Interaction[]) => {
          this.refInteraction = interaction.filter((i: Interaction) => i.uid === id)[0];
          this.form.get('refId').setValue(this.refInteraction.refId);
          this.form.get('text').setValue(this.refInteraction.text);
          this.form.get('type').setValue(this.refInteraction.type);
          this.form.get('recipients').setValue(this.refInteraction.recipients);
          this.editMode = true;
        });
    }

    // person related interaction
    if (this._refPerson && this._refPerson !== undefined) {
      this.form.get('refId').setValue(this._refPerson.uid);
    }
  }

  private _setContextMenu(): void {
    const buttons: ContextButton[] = [];
    buttons.push({ icon: 'people', link: '/person', title: 'LIST PEOPLE' });
    this._store.dispatch(new SetContextButtonsAction(buttons));
  }
}
