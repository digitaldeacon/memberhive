import { Component, OnInit } from '@angular/core';
import { MdButtonToggleChange } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PersonService } from "../../person/person.service";
import { Person } from "../../person/person";

import { Note, NoteType } from "../note";
import { NoteService } from "../note.service";
import { InteractionService } from "../../common/interaction.service";

import { AuthService } from '../../common/auth/auth.service';
import { ShoutService } from '../../common/shout.service';

@Component({
  selector: 'mh-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss', '../note-common.styles.scss']
})
export class NoteCreateComponent implements OnInit {

  private _author: Person;
  private _refPerson: Person;

  noteForm: FormGroup;
  noteTypes: Array<NoteType>;
  refNote: Note;

  returnToRoute: string;

  allowedContacts: Array<Person>;

  showTypeSelector: boolean = false;
  submitted: boolean = false;
  editMode: boolean = false;
  error: string;

  constructor(private _fb: FormBuilder,
              private _personService: PersonService,
              private _noteService: NoteService,
              private _auth: AuthService,
              private _shout: ShoutService,
              private _interactionService: InteractionService,
              private _router: Router) {
    this._noteService.getNoteTypes() // TODO: move this into the options table
        .subscribe((types: Array<NoteType>) => {
          this.noteTypes = types;
        });
    this._author = this._auth.getCurrentUser();
  }

  ngOnInit(): void {
    this.getAllowedContacts();
    this.noteForm = this._fb.group({
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
    if (this.showTypeSelector && !this.noteForm.dirty) {
      this.noteForm.reset();
      this.showTypeSelector = false;
      this.initDefaults();
    } else {
      this.showTypeSelector = true;
    }
  }

  keyupHandlerFunction(event: any): void {
    // console.log('note-list', event);
  }

  clearForm(): void {
    this.noteForm.reset();
    this.showTypeSelector = false;
    this.initDefaults();
  }

  save(model: Note, isValid: boolean): void {
    if (isValid) {
      model.authorId = this._author.uid;
      this._interactionService.create(model);
      this.noteForm.reset();
      if (this.returnToRoute !== '') {
        this._router.navigate([this.returnToRoute]);
      }
    }
  }

  private initDefaults(): void {
    //this._refPerson = this._interactionService.getPersonNoted();
    //this.refNote = this._interactionService.getNote();
    this.returnToRoute = this._interactionService.getLastRoute();

    if (this.noteForm && this._author) {
      this.noteForm.get('recipients').setValue([this._author.uid]);
    }
    // person related interaction
    if (this._refPerson && this._refPerson !== undefined) {
      this.noteForm.get('owner').setValue(this._refPerson.uid);
    }
    /*
    if (this.dialogData.note) {
      this.note = this.dialogData.note;
      this.noteForm.get('owner').setValue(this.note.ownerId);
      this.noteForm.get('text').setValue(this.note.text);
      this.noteForm.get('type').setValue(this.note.typeId);
      this.noteForm.get('recipients').setValue(this.note.recipients);
      this.editMode = true;
    }
    // birthday interactions
    if (this.dialogData.person) {
      this._refPerson = this.dialogData.person;
      this.noteForm.get('owner').setValue(this._refPerson.uid);
      this.noteForm.get('dueOn').setValue(this._refPerson.birthday);
    }*/
  }

}
