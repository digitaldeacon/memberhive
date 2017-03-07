import { Injectable } from '@angular/core';
import { HttpService } from "../common/http.service";
import { Observable } from "rxjs";
import { Person } from "./person";
import { Response } from '@angular/http';

import { Dropdown } from '../form/form.dropdown';
import { FormBase } from '../form/form.base';
import { Textbox }  from '../form/form.textbox';

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
    public getCustomFields(id: string): Observable<Person> {
        return this.http.get('person/custom?id=' + id)
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
    public getSettings() {
        /*new Textbox({
         key: 'firstName',
         label: 'First name',
         value: 'Bombasto',
         required: true,
         order: 4
         }),
         new Dropdown({
         key: 'brave',
         label: 'Bravery Rating',
         options: [
         {key: 'solid',  value: 'S4olid'},
         {key: 'great',  value: 'Great'},
         {key: 'good',   value: 'Good'},
         {key: 'unproven', value: 'Unproven'}
         ],
         order: 3
         })*/
        let meta = {
            'firstName':
                {
                    type: 'textbox',
                    label: 'First Name',
                    value: '',
                    required: true,
                    order: 1
                }
        };
        // forEach meta push
        // people.push();
        // TODO: shold we map a meta structure that we get from a setup table?
        // or get the person data as object back, including the type definitions?
        return meta; //.sort((a, b) => a.order - b.order); // sort this from the api
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
