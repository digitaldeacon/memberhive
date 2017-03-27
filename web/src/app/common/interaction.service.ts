import { Injectable } from '@angular/core';
import { BehaviorSubject }    from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs";

import { Note } from '../note/note';
import { NoteService } from '../note/note.service';
import { AuthService } from '../common/auth/auth.service';
import { ShoutService } from "../common/shout.service";

import { Person } from "../person/person";

@Injectable()
export class InteractionService {
    private _interactions: BehaviorSubject<Note[]>;
    private _myInteractions: BehaviorSubject<Note[]>;
    private _dataStore: {
        interactions: Note[],
        myInteractions: Note[]
    };
    private _lastRoute: string;
    private _me: Person;

    interactions: Observable<Note[]>;
    myInteractions: Observable<Note[]>;

    constructor(private _noteService: NoteService,
                private _auth: AuthService,
                private _shout: ShoutService) {
        this._dataStore = {
            interactions: [],
            myInteractions: []
        };
        this._interactions = <BehaviorSubject<Note[]>>new BehaviorSubject([]);
        this._myInteractions = <BehaviorSubject<Note[]>>new BehaviorSubject([]);
        this.interactions = this._interactions.asObservable();
        this.myInteractions = this._myInteractions.asObservable();
        this._me = this._auth.getCurrentUser();
    }

    loadMy(): void {
        this._noteService.getMyInteractions()
            .subscribe((notes: Array<Note>) => {
                this._dataStore.myInteractions = notes;
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

    create(interaction: Note): void {
        this._noteService.createNotePerson(interaction)
            .subscribe(
                (newInteraction: Note) => {
                   this._dataStore.interactions.push(newInteraction);
                   this._interactions.next(Object.assign({}, this._dataStore).interactions);
                   if (newInteraction.recipients.find((uid: any) => uid === this._me.uid)) {
                       this._dataStore.myInteractions.push(newInteraction);
                       this._myInteractions.next(Object.assign({}, this._dataStore).myInteractions);
                   }
                   this._shout.success('Note created');
                },
                (error: any) => {
                    // console.log('Error: ' + error);
                }
            );
    }

    update(interaction: Note): void {
        // update
    }

    remove(id: number | string): void {
        this._noteService.endInteraction(id)
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
        this._noteService.completeInteraction(id, checked)
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
