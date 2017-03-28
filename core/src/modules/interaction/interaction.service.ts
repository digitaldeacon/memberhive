import { Injectable } from '@angular/core';
import { HttpService } from "../../services/http.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/publishReplay';
import { Interaction } from "./interaction";
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class InteractionService {
    private _me: string;
    private _interactions: Observable<Interaction[]>;

    constructor(private http: HttpService,
                private auth: AuthService) {
        this._me = this.auth.getCurrentUser().uid;
    }
    public getInteractionsAll(): Observable<Interaction[]> {
        return this.http.get('note/list-all')
            .map(this.deserializeList);
    }
    public getInteractions(id: string, noMarkup: boolean = true): Observable<Interaction[]> {
        if (!this._interactions) {
            this._interactions = this.http.get('note/list?id=' + id
                + '&noMarkup=' + noMarkup + '&u=' + this._me)
                .map(this.deserializeList)
                .publishReplay()
                .refCount();
        }
        return this._interactions;
    }
    public getInteraction(id: string, noMarkup: boolean = false): Observable<Interaction> {
        return this.http.get('note/get?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this._me)
            .map(this.deserialize);
    }
    public createInteractionPerson(note: Interaction): Observable<Interaction> {
        return this.http.post('note/create-person', note)
            .map(this.deserialize);
    }
    public createInteractionGroup(note: Interaction): Observable<Interaction> {
        return this.http.post('note/create-group', note)
            .map(this.deserialize);
    }
    public deleteInteraction(note: Interaction): Observable<string> {
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
