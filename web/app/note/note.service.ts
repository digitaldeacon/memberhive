import { Injectable } from '@angular/core';
import { HttpService } from "../common/http.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/publishReplay';
import { Note, NoteType } from "./note";
import { AuthService } from '../common/auth/auth.service';

@Injectable()
export class NoteService {
    private _me: string;
    private _notes: Observable<Note[]>;
    private _noteTypes: Observable<NoteType[]>;

    constructor(private http: HttpService,
                private auth: AuthService) {
        this._me = this.auth.getCurrentUser().uid;
    }
    public getNotesAll(): Observable<Note[]> {
        return this.http.get('note/list-all')
            .map(this.deserializeList);
    }
    public getNotes(id: string, noMarkup: boolean = true): Observable<Note[]> {
        if (!this._notes) {
            this._notes = this.http.get('note/list?id=' + id
                + '&noMarkup=' + noMarkup + '&u=' + this._me)
                .map(this.deserializeList)
                .publishReplay()
                .refCount();
        }
        return this._notes;
    }
    public getNote(id: string, noMarkup: boolean = false): Observable<Note> {
        return this.http.get('note/get?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this._me)
            .map(this.deserialize);
    }
    public createNotePerson(note: Note): Observable<Note> {
        return this.http.post('note/create-person', note)
            .map(this.deserialize);
    }
    public createNoteGroup(note: Note): Observable<Note> {
        return this.http.post('note/create-group', note)
            .map(this.deserialize);
    }
    public deleteNote(note: Note): Observable<string> {
        return this.http.post('note/delete', {id: note.id, author: this._me})
            .map((r: any) => r);
    }
    public getNoteTypes(): Observable<NoteType[]> {
        if (!this._noteTypes) {
            this._noteTypes = this.http.get('note/list-types')
                .map(this.deserializeTypeList)
                .publishReplay()
                .refCount();
        }
        return this._noteTypes;
    }

    public getMyInteractions(noMarkup: boolean = true): Observable<Note[]> {
        return this.http.get('note/mine?id=' + this._me + '&noMarkup=' + noMarkup)
            .map(this.deserializeList);
    }
    public completeInteraction(note: Note, complete: boolean): Observable<string> {
        return this.http.post('note/complete', {id: note.id, author: this._me, complete: complete})
            .map((r: any) => r);
    }
    public endInteraction(note: Note): Observable<string> {
        return this.http.post('note/end', {id: note.id, author: this._me})
            .map((r: any) => r);
    }

    // serialiers
    private deserialize(resp: any): Note {
        return new Note().deserialize(resp.response);
    }
    private deserializeList(resp: any): Array<Note> {
        return resp.response.map((r: any) => new Note().deserialize(r));
    }
    private deserializeTypeList(resp: any): Array<NoteType> {
        return resp.response.map((r: any) => new NoteType().deserialize(r));
    }
}
