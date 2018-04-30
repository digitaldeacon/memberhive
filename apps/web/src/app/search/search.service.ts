import { Injectable } from '@angular/core';
import { HttpService } from '@memberhivex/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class SearchService {
  constructor(private _http: HttpService) {}

  search(query: string): Observable<any> {
    return this._http.get('search/search?q=' + query).pipe(map((r: any) => r.response));
  }
}
