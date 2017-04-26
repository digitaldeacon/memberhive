import { Injectable } from '@angular/core';
import { HttpService } from "../common/http.service";
import { Observable } from "rxjs";
import 'rxjs/add/operator/publishReplay';
import { Interaction, InteractionType } from "./interaction";
import { AuthService } from '../common/auth/auth.service';

@Injectable()
export class InteractionService {
    private _me: string;
    private _interactions: Observable<Interaction[]>;
    private _interactionTypes: Observable<InteractionType[]>;

    constructor(private http: HttpService,
                private auth: AuthService) {
        this._me = this.auth.getCurrentUser().uid;
    }
    public getInteractionsAll(): Observable<Interaction[]> {
        return this.http.get('interaction/list-all')
            .map(this.deserializeList);
    }
    public getInteractions(id: string, noMarkup: boolean = true): Observable<Interaction[]> {
        if (!this._interactions) {
            this._interactions = this.http.get('interaction/list?id=' + id
                + '&noMarkup=' + noMarkup + '&u=' + this._me)
                .map(this.deserializeList)
                .publishReplay()
                .refCount();
        }
        return this._interactions;
    }
    public getInteraction(id: string, noMarkup: boolean = false): Observable<Interaction> {
        return this.http.get('interaction/get?id=' + id
            + '&noMarkup=' + noMarkup + '&u=' + this._me)
            .map(this.deserialize);
    }
    public createInteractionPerson(interaction: Interaction): Observable<Interaction> {
        return this.http.post('interaction/create-person', interaction)
            .map(this.deserialize);
    }
    public createInteractionGroup(interaction: Interaction): Observable<Interaction> {
        return this.http.post('interaction/create-group', interaction)
            .map(this.deserialize);
    }
    public deleteInteraction(interaction: Interaction): Observable<string> {
        return this.http.post('interaction/delete', {id: interaction.id, author: this._me})
            .map((r: any) => r);
    }
    public getInteractionTypes(): Observable<InteractionType[]> {
        if (!this._interactionTypes) {
            this._interactionTypes = this.http.get('interaction/list-types')
                .map(this.deserializeTypeList)
                .publishReplay()
                .refCount();
        }
        return this._interactionTypes;
    }

    public getMyInteractions(noMarkup: boolean = true): Observable<Interaction[]> {
        return this.http.get('interaction/mine?id=' + this._me + '&noMarkup=' + noMarkup)
            .map(this.deserializeList);
    }
    public completeInteraction(id: number | string, complete: boolean): Observable<Interaction> {
        return this.http.post('interaction/complete', {id: id, author: this._me, complete: complete})
            .map(this.deserialize);
    }
    public endInteraction(id: number | string): Observable<Interaction> {
        return this.http.post('interaction/end', {id: id, author: this._me})
            .map((r: any) => r);
    }

    // serializers
    private deserialize(resp: any): Interaction {
        return new Interaction().deserialize(resp.response);
    }
    private deserializeList(resp: any): Array<Interaction> {
        return resp.response.map((r: any) => new Interaction().deserialize(r));
    }
    private deserializeTypeList(resp: any): Array<InteractionType> {
        return resp.response.map((r: any) => new InteractionType().deserialize(r));
    }
}
