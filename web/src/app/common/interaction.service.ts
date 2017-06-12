import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

import { Interaction } from '../interaction/interaction';
import * as intsrv from '../interaction/interaction.service';
import { ShoutService } from './/shout.service';

import { AuthService, Person } from 'mh-core';

import * as app from '../app.store';
import * as auth from 'mh-core';

@Injectable()
export class InteractionService {
    private _interactions: BehaviorSubject<Interaction[]>;
    private _myInteractions: BehaviorSubject<Interaction[]>;
    private _dataStore: {
        interactions: Interaction[],
        myInteractions: Interaction[]
    };
    private _lastRoute: string;
    private _me: string;

    interactions: Observable<Interaction[]>;
    myInteractions: Observable<Interaction[]>;

    constructor(private _interactionService: intsrv.InteractionService,
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
        this._me = this._auth.getPersonId();
    }

    loadMy(): void {
        this._interactionService.getMyInteractions()
            .subscribe((interactions: Array<Interaction>) => {
                this._dataStore.myInteractions = interactions;
                this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions);
            },
            (error: any) => {
            // console.log('Could not load your interactions: ' + error)
        });
    }

    loadAll(): void {
        // load all
    }

    load(id: number | string): void {
        // load single
    }

    create(interaction: Interaction): void {
        this._interactionService.createInteractionPerson(interaction)
            .subscribe(
                (newInteraction: Interaction) => {
                   this._dataStore.interactions.push(newInteraction);
                   this._interactions.next(Object.assign({}, this._dataStore).interactions);
                   if (newInteraction.recipients.find((uid: any) => uid === this._me)) {
                       this._dataStore.myInteractions.push(newInteraction);
                       this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions);
                   }
                   this._shout.success('Interaction created');
                },
                (error: any) => {
                    // console.log('Error: ' + error);
                }
            );
    }

    update(interaction: Interaction): void {
        // update
    }

    remove(id: number | string): void {
        this._interactionService.endInteraction(id)
            .subscribe((r: any) => {
                this._dataStore.interactions.forEach((t: any, i: number) => {
                    if (t.id === id) { this._dataStore.interactions.splice(i, 1); }
                });
                this._dataStore.myInteractions.forEach((t: any, i: number) => {
                    if (t.id === id) { this._dataStore.myInteractions.splice(i, 1); }
                });
            });
    }

    complete(id: number | string, checked: boolean): void {
        this._interactionService.completeInteraction(id, checked)
            .subscribe((data: any) => {
                this._dataStore.myInteractions.forEach((t: any, i: number) => {
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
