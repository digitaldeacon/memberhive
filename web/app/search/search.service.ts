import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";

@Injectable()
export class SearchService {
    constructor(private http: HttpService) {}

    public search(query: string): Observable<any[]> {
        return this.http.get('search/search?q=' + query)
            .map(this.deserializeList);
    }

    private deserializeList(resp: any): Array<any> {
        return resp.response.map((r: any) => r);
    }

}
