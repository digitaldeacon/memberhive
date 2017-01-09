import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";
@Injectable()
export class PersonService {
    constructor(private http: HttpService) {

    }
    public getPersons(): Observable<Array<any>> {
        return this.http.get('person/list').map((resp: any) => resp.response);
    }
    public getPerson(id: number): Observable<any> {
        return this.http.get('person/view?id=' + id).map((resp: any) => resp.response);
    }

}
