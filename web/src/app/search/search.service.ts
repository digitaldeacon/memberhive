import { Injectable } from '@angular/core';
import { HttpService } from 'mh-core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SearchService {
    constructor(private _http: HttpService) {}

    search(query: string): Observable<any> {
        return this._http.get('search/search?q=' + query)
            .map((r: any) => r.response);
    }

}
