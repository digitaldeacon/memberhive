import { Injectable } from '@angular/core';
import { HttpService } from '../common/http.service';
import { Observable } from 'rxjs';
import { ActionLog } from './audit';

@Injectable()
export class AuditService {
    constructor(private http: HttpService) {}

    public getLogPerson(id: string): Observable<ActionLog[]> {
        return this.http.get('action-log/list?id=' + id + '&context=person')
            .map(this.deserializeList);
    }
    private deserializeList(resp: any): Array<ActionLog> {
        return resp.response.map((r: any) => new ActionLog().deserialize(r));
    }
}
