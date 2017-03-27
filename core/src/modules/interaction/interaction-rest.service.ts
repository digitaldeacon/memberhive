import { Injectable } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/publishReplay';
import { Interaction } from "./interaction";
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class InteractionRestService {
    private _me: string;
    private _notes: Observable<Interaction[]>;

    constructor(private http: HttpService,
                private auth: AuthService) {
        this._me = this.auth.getCurrentUser().uid;
    }
    public getNotesAll(): Observable<Interaction[]> {
        return this.http.get('note/list-all')
            .map(this.deserializeList);
    }
    public getNotes(id: string, noMarkup: boolean = true): Observable<Interaction[]> {
        if (!this._notes) {
            this._notes = this.http.get('note/list?id=' + id
                + '&noMarkup=' + noMarkup + '&u=' + this._me)
                .map(this.deserializeList)
                .publishReplay()
                .refCount();
        }
        return this._notes;
    }
    public getNote(id: string, noMarkup: boolean = false): Observable<Interaction> {
        return this.http.get('note/get?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this._me)
            .map(this.deserialize);
    }
    public createNotePerson(note: Interaction): Observable<Interaction> {
        return this.http.post('note/create-person', note)
            .map(this.deserialize);
    }
    public createNoteGroup(note: Interaction): Observable<Interaction> {
        return this.http.post('note/create-group', note)
            .map(this.deserialize);
    }
    public deleteNote(note: Interaction): Observable<string> {
        return this.http.post('note/delete', {id: note.id, author: this._me})
            .map((r: any) => r);
    }

    public getMyInteractions(noMarkup: boolean = true): Observable<Interaction[]> {
        return this.http.get('note/mine?id=' + this._me + '&noMarkup=' + noMarkup)
            .map(this.deserializeList);
    }
    public completeInteraction(id: number | string, complete: boolean): Observable<Interaction> {
        return this.http.post('note/complete', {id: id, author: this._me, complete: complete})
            .map(this.deserialize);
    }
    public endInteraction(id: number | string): Observable<Interaction> {
        return this.http.post('note/end', {id: id, author: this._me})
            .map((r: any) => r);
    }

    // serializers
    private deserialize(resp: any): Interaction {
        return new Interaction().deserialize(resp.response);
    }
    private deserializeList(resp: any): Array<Interaction> {
        return resp.response.map((r: any) => new Interaction().deserialize(r));
    }
}
