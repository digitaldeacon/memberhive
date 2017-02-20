import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";
import {Note, NoteType} from "./note";

@Injectable()
export class NoteService {
    constructor(private http: HttpService) {}
    public getNotesAll(): Observable<Note[]> {
        return this.http.get('note/list-all')
            .map(this.deserializeList);
    }
    public getNotes(id: string): Observable<Note[]> {
        return this.http.get('note/list?id=' + id)
            .map(this.deserializeList);
    }
    public getNote(id: string): Observable<Note> {
        return this.http.get('note/get?id=' + id)
            .map(this.deserialize);
    }
    public createNote(note: Note): Observable<Note> {
        return this.http.post('note/create', note)
            .map(this.deserialize);
    }
    public deleteNote(noteId: number): Observable<string> {
        return this.http.post('note/delete', noteId)
            .map((r: any) => r.json());
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
