import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class HttpService {

    constructor(private _http: HttpClient, private _auth: AuthService) {
    }

    get(url: string): Observable<any> {
        return this.request(url, 'GET');
    }

    post(url: string, body: any): Observable<any> {
        return this.request(url, 'POST', body);
    }

    getRaw(url: string): Observable<any> {
        return this._http.get(url);
    }

    unauthenticatedPost(url: string, body: any): Observable<any> {
        const headers: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8');
        let options: any = {
            headers: headers,
            withCredentials: false
        };
        return this._http.post('/api/' + url, body, options);
    }

    private request(url: string, method: string, body?: any): Observable<any> {
        const h: HttpHeaders = new HttpHeaders()
            .set('Content-Type', 'application/json; charset=utf-8')
            .set('Authorization', `Bearer ${this._auth.token}`)
            .set('Client', this._auth.client );
        let options: any = {
            body: body,
            headers: h,
            withCredentials: true
        };

        return this._http.request<any>(method, '/api/' + url, options);
    }
}
