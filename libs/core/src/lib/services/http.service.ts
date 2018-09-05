import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../modules/auth/auth.service';

@Injectable()
export class HttpService {
  constructor(private _http: HttpClient, private _auth: AuthService) {}

  get(url: string): Observable<any> {
    return this.request(url, 'GET');
  }

  post(url: string, body: any): Observable<any> {
    return this.request(url, 'POST', body);
  }

  getRaw(url: string): Observable<any> {
    return this._http.get<any>(url);
  }

  unauthenticatedPost(url: string, body: any): Observable<any> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    const options: any = {
      headers: headers,
      withCredentials: false
    };
    return this._http.post('/api/' + url, body, options);
  }

  private request(url: string, method: string, body?: any): Observable<any> {
    const token: string = this._auth.token ? this._auth.token : '';
    const h: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', `Bearer ${token}`);
    // .set('Client', client );
    const options: any = {
      body: body,
      headers: h,
      withCredentials: true
    };

    return this._http.request<any>(method, '/api/' + url, options);
  }
}
