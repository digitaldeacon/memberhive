import { Injectable } from '@angular/core';
import { HttpService } from 'mh-core';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
    constructor(private http: HttpService) {}

    public search(query: string): Observable<any[]> {
        return this.http.get('search/search?q=' + query)
            .map((r: any) => r.response);
    }

}
