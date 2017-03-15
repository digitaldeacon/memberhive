import { Injectable } from '@angular/core';
import { LocalStorage } from 'ng2-webstorage';
import { Note } from '../note/note';

@Injectable()
export class InteractionService {
    @LocalStorage() private myInteractions: Array<Note>;

    public setMyInteractions(notes: Array<Note>): void {
        this.myInteractions = notes;
        this.myInteractions = this.myInteractions; // because of issue with extension
    }

    public getMyInteractions(): Array<Note> {
        return this.myInteractions;
    }

    public addInteraction(note: Note): void {
        this.myInteractions.push(note);
    }

    public removeInteraction(note: Note): void {
        this.myInteractions.slice(this.myInteractions.indexOf(note), 1);
    }
}
