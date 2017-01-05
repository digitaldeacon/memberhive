import {Injectable} from "@angular/core";
import {Http, Headers, Response, Request, BaseRequestOptions, RequestMethod} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth/auth.service";
@Injectable()
export class HttpService {

    constructor(private http: Http, private auth:AuthService) {
    }

    get(url: string): Observable<any> {
        return this.request(url, RequestMethod.Get);
    }

    post(url: string, body: any) {
        return this.request(url, RequestMethod.Post, body);
    }

    unauthenicatedPost(url: string, body: any): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let options = new BaseRequestOptions();
        options.headers = headers;
        options.url = 'http://localhost/memberhive2/api/'+url;
        options.method = RequestMethod.Post;
        options.body = JSON.stringify(body);
        options.withCredentials = false;

        let request = new Request(options);

        return this.http.request(request).map(response => response.json());
    }

    private request(url: string, method: RequestMethod, body?: any): Observable<any> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

        let options = new BaseRequestOptions();
        options.headers = headers;
        options.url = 'http://localhost/memberhive2/api/'+url;
        options.method = method;
        options.body = JSON.stringify(body);
        options.withCredentials = true;

        let request = new Request(options);

        return this.http.request(request).map(response => response.json());
    }


}