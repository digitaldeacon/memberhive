import { Injectable } from '@angular/core';
import { HttpService } from 'mh-core';
import { Observable } from 'rxjs';
import { Person } from './person';
import { Response } from '@angular/http';

/*
* @deprecated: will be removed soon
 */
@Injectable()
export class PersonService {
    constructor(private http: HttpService) {}

    public getPersons(): Observable<Person[]> {
        return this.http.get('person/list')
            .map(this.deserializeList);
    }
    public getPerson(id: string): Observable<Person> {
        return this.http.get('person/get?id=' + id)
            .map(this.deserialize);
    }
    public updatePerson(person: Person): Observable<Person> {
        return this.http.post('person/update?id=' + person.uid, person)
            .map(this.deserialize);
    }
    // @params: column Object{}, takes column name and value
    public updateColumn(column: any, id: string): Observable<Person> {
        return this.http.post('person/update-column?id=' + id, column)
            .map(this.deserialize);
    }
    public createPerson(person: Person): Observable<Person> {
        return this.http.post('person/create', person)
            .map(this.deserialize);
    }
    public searchPersons(query: string): Observable<Person[]> {
        return this.http.get('search/search?q=' + query)
            .map(this.deserializeList);
    }
    // receives jsonified base64 string to pass to api
    public uploadAvatar(image: Object): Observable<any> {
        return this.http.post('person/avatar-upload', image)
            .map(this.deserialize);
    }
    public geocode(address: string): Observable<any> {
        return this.http.getRaw('https://maps.googleapis.com/maps/api/geocode/json?address=' + address)
            .map((r: any) => r.json());
    }
    private deserialize(resp: any): Person {
        return new Person().deserialize(resp.response);
    }
    private deserializeList(resp: any): Array<Person> {
        return resp.response.map((r: any) => new Person().deserialize(r));
    }
    private extractData(res: Response): any {
        return res || { };
    }
}
