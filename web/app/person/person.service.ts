import {Injectable} from '@angular/core';
import {HttpService} from "../common/http.service";
import {Observable} from "rxjs";
import {Person} from "./person";
@Injectable()
export class PersonService {
    constructor(private http: HttpService) {

    }
    public getPersons(): Observable<Person[]> {
        return this.http.get('person/list')
            .map(this.deserializeList);
    }
    public getPerson(id: number): Observable<Person> {
        return this.http.get('person/get?id=' + id)
            .map(this.deserialize);
    }
    public updatePerson(person: Person): Observable<Person> {
        return this.http.post('person/update?id=' + person.id, person.serialize())
            .map(this.deserialize);
    }
    public createPerson(person: Person): Observable<Person> {
        return this.http.post('person/create', person.serialize())
            .map(this.deserialize);
    }

    private deserialize(resp: any): Person {
        return new Person().deserialize(resp.response);
    }
    private deserializeList(resp: any): Array<Person> {
        return resp.response.map((r: any) => new Person().deserialize(r));
    }

}
