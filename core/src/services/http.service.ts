import { Injectable } from '@angular/core';
import {
    Http,
    Headers,
    Response,
    Request,
    BaseRequestOptions,
    RequestMethod
} from '@angular/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class HttpService {

    constructor(private _http: Http, private _auth: AuthService) {
    }

    get(url: string): Observable<any> {
        return this.request(url, RequestMethod.Get);
    }

    post(url: string, body: any): Observable<any> {
        return this.request(url, RequestMethod.Post, body);
    }

    getRaw(url: string): Observable<any> {
        return this._http.get(url);
    }

    unauthenticatedPost(url: string, body: any): Observable<any> {
        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options: BaseRequestOptions = new BaseRequestOptions();
        options.headers = headers;
        options.url = '/api/' + url;
        options.method = RequestMethod.Post;
        options.body = JSON.stringify(body);
        options.withCredentials = false;

        let request: Request = new Request(options);

        return this._http.request(request).map((response: Response) => response.json());
    }

    private request(url: string, method: RequestMethod, body?: any): Observable<any> {

        let headers: Headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this._auth.token}`);
        headers.append('Client', this._auth.client );

        let options: BaseRequestOptions = new BaseRequestOptions();
        options.headers = headers;
        options.url = '/api/' + url;
        options.method = method;
        options.body = JSON.stringify(body);
        options.withCredentials = true;

        let request: Request = new Request(options);

        return this._http.request(request).map((response: Response) => response.json());
    }

}
