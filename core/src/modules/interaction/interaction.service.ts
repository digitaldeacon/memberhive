import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs";

import { Interaction } from './interaction';
import { InteractionRestService } from './interaction-rest.service';
import { AuthService } from '../../services/auth/auth.service';
import { ShoutService } from "../../services/shout.service";

import { Person } from "../person/person";

@Injectable()
export class InteractionService {
    interactions: Observable<Interaction[]>;
    myInteractions: Observable<Interaction[]>;
    private _interactions: BehaviorSubject<Interaction[]>;
    private _myInteractions: BehaviorSubject<Interaction[]>;
    private _dataStore: {
        interactions: Interaction[],
        myInteractions: Interaction[]
    }
    private _lastRoute: string;
    private _me: Person;

    constructor(private _interactionService: InteractionRestService,
                private _auth: AuthService,
                private _shout: ShoutService) {
        this._dataStore = {
            interactions: [],
            myInteractions: []
        };
        this._interactions = <BehaviorSubject<Interaction[]>>new BehaviorSubject([]);
        this._myInteractions = <BehaviorSubject<Interaction[]>>new BehaviorSubject([]);
        this.interactions = this._interactions.asObservable();
        this.myInteractions = this._myInteractions.asObservable();
        this._me = this._auth.getCurrentUser();
    }

    loadMy(): void {
        this._interactionService.getMyInteractions()
            .subscribe((notes: Array<Interaction>) => {
                    this._dataStore.myInteractions = notes;
                    this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions)
                },
                error => console.log('Could not load your interactions: ' + error));
    }

    loadAll(): void {

    }

    load(id: number | string): void {

    }

    create(interaction: Interaction): void {
        this._interactionService.createNotePerson(interaction)
            .subscribe(
                (newInteraction: Interaction) => {
                    this._dataStore.interactions.push(newInteraction);
                    this._interactions.next(Object.assign({}, this._dataStore).interactions);
                    if (newInteraction.recipients.find((n: any) => n == this._me.uid)) {
                        this._dataStore.myInteractions.push(newInteraction);
                        this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions);
                    }
                    this._shout.success('Note created');
                },
                (error: any) => {
                    console.log('Error: ' + error);
                }
            );
    }

    update(interaction: Interaction): void {

    }

    remove(id: number | string): void {
        this._interactionService.endInteraction(id)
            .subscribe((r: any) => {
                this._dataStore.interactions.forEach((t, i) => {
                    if (t.id === id) { this._dataStore.interactions.splice(i, 1); }
                });
                this._dataStore.myInteractions.forEach((t, i) => {
                    if (t.id === id) { this._dataStore.myInteractions.splice(i, 1); }
                });
            });
    }

    complete(id: number | string, checked: boolean): void {
        this._interactionService.completeInteraction(id, checked)
            .subscribe((data: any) => {
                console.log(data);
                this._dataStore.myInteractions.forEach((t, i) => {
                    if (t.id === data.id) { this._dataStore.myInteractions[i] = data; }
                });
                this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions);
            });
    }

    getLastRoute(): string {
        return this._lastRoute;
    }
    setLastRoute(route: string): void {
        this._lastRoute = route;
    }
}
