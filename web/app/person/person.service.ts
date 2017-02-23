import { Injectable } from '@angular/core';
import { HttpService } from "../common/http.service";
import { Observable } from "rxjs";
import { Person } from "./person";
import { Response } from '@angular/http';

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
    public createPerson(person: Person): Observable<Person> {
        return this.http.post('person/create', person)
            .map(this.deserialize);
    }
    public searchPersons(query: string): Observable<Person[]> {
        return this.http.get('search/search?q=' + query)
            .map(this.deserializeList);
    }
    public uploadAvatar(file: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post('person/avatar-upload', formData)
            .map(this.extractData);
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
