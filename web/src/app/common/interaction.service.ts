import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Note } from '../note/note';
import { NoteService } from '../note/note.service';
import { Person } from "../person/person";
import { Observable } from "rxjs";

@Injectable()
export class InteractionService {
    private _myInteractionsSubject: Subject<Note[]> = new Subject<Note[]>();
    private _newInteraction: Note;
    private _lastRoute: string;
    private _personNoted: Person;
    private _ref: any;
    private _note: Note;

    myInteractions$: Observable<any> = this._myInteractionsSubject.asObservable();

    constructor(private _noteService: NoteService) {
        this._noteService.getMyInteractions()
            .subscribe((notes: Array<Note>) => {
                this.setInteraction(notes);
            });
    }

    setInteraction(interactions: Note[]): void {
        this._myInteractionsSubject.next(interactions);
    }

    save(model: Note, isValid: boolean): void {
        if (isValid) {
            /*model.authorId = this._author.uid;
            if (this.dialogData.note) {
                model.uid = this.dialogData.note.uid;
            }
            this._noteService.createNotePerson(model)
                .subscribe(
                    (note: Note) => {
                        this.noteForm.reset();
                        return true;
                    },
                    (error: any) => {
                        this.error = error;
                        return false;
                    }
                );*/
        }
    }

    init(ref: any = undefined): void {
        if (ref instanceof Person) {
            this._personNoted = ref;
        }
        if (ref instanceof Note) {
            this._note = ref;
        }
        this._ref = ref;
    }

    getRef(): any {
        return this._ref;
    }
    getPersonNoted(): Person {
        return this._personNoted;
    }
    getNote(): Note {
        return this._note;
    }

    getLastRoute(): string {
        return this._lastRoute;
    }
    setLastRoute(route: string): void {
        this._lastRoute = route;
    }
}
