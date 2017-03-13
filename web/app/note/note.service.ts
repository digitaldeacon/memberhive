import { Injectable } from '@angular/core';
import { HttpService } from "../common/http.service";
import { Observable } from "rxjs";
import { Note, NoteType } from "./note";
import { AuthService } from '../common/auth/auth.service';

@Injectable()
export class NoteService {
    private me: string;

    constructor(private http: HttpService,
                private auth: AuthService) {
        this.me = this.auth.getCurrentUser().uid;
    }
    public getNotesAll(): Observable<Note[]> {
        return this.http.get('note/list-all')
            .map(this.deserializeList);
    }
    public getNotes(id: string, noMarkup: boolean = true): Observable<Note[]> {
        return this.http.get('note/list?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this.me)
            .map(this.deserializeList);
    }
    public getNote(id: string, noMarkup: boolean = false): Observable<Note> {
        return this.http.get('note/get?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this.me)
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
        return this.http.post('note/delete', {id: note.id, author: this.me})
            .map((r: any) => r);
    }
    public getNoteTypes(): Observable<NoteType[]> {
        return this.http.get('note/list-types')
            .map(this.deserializeTypeList);
    }
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
