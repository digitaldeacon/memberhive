import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";
import {Memo} from "./memo.interface";

@Injectable()
export class MemoService {
    constructor(private http: HttpService) {}
    public getMemos(): Observable<Memo[]> {
        return;
    }
}
