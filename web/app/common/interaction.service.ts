import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Note } from '../note/note';
import { NoteService } from '../note/note.service';
import {Observable} from "rxjs";

@Injectable()
export class InteractionService {
    private myInteractionsSubject: Subject<Note[]> = new Subject<Note[]>();

    myInteractions$: Observable<any> = this.myInteractionsSubject.asObservable();

    constructor(private _noteService: NoteService) {
        this._noteService.getMyInteractions()
            .subscribe((notes: Array<Note>) => {
                this.setInteraction(notes);
            });
    }

    setInteraction(interactions: Note[]): void {
        this.myInteractionsSubject.next(interactions);
    }
}
