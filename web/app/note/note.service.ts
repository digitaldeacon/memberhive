import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";
import {Note} from "./note.interface";

@Injectable()
export class NoteService {
    constructor(private http: HttpService) {}
    public getMemos(): Observable<Note[]> {
        return;
    }
}
