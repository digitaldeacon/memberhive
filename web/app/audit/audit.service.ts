import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/publishReplay';
import { ActionLog } from './audit';

@Injectable()
export class AuditService {
    private _logs: Observable<ActionLog[]>;

    constructor(private http: HttpService) {}

    public getLogPerson(id: string): Observable<ActionLog[]> {
        if (!this._logs) {
            this._logs = this.http.get('action-log/list?id=' + id + '&context=person')
                .map(this.deserializeList)
                .publishReplay()
                .refCount();
        }
        return this._logs;
    }
    private deserializeList(resp: any): Array<ActionLog> {
        return resp.response.map((r: any) => new ActionLog().deserialize(r));
    }
}
