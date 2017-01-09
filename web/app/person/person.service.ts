import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
@Injectable()
export class PersonService {
    constructor(private http: HttpService) {

    }
    public getPersons() {
        return this.http.get('person/list').map(resp => resp.response);
    }
    public getPerson(id: number) {
        return this.http.get('person/view?id='+id).map(resp => resp.response);
    }

}