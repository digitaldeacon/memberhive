import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt_decode_ from 'jwt-decode';

const jwt_decode = jwt_decode_;

@Injectable()
export class AuthService {
    private _token: string;
    private _uid: string;
    private _createdAt: Date;
    private _clientToken: string;

    constructor(private _storage: LocalStorageService) {}

    @LocalStorage()
    set token(token: string) {
        this._token = token;
    }
    get token(): string {
        return this._token;
    }

    @LocalStorage()
    set client(clientToken: string) {
        this._clientToken = clientToken;
    }
    get client(): string {
        return this._clientToken;
    }

    @LocalStorage()
    set personId(uid: string) {
        this._uid = uid;
        this._uid = this._uid; // because of issue with extension
    }
    get personId(): string {
        return this._uid;
    }

    @LocalStorage()
    set createdAt(dateTime: Date) {
        this._createdAt = dateTime;
    }
    get createdAt(): Date {
        return this._createdAt;
    }

    clearStore(): void {
        this._storage.clear();
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
        //return this._jwtHelper.getTokenExpirationDate(token);
    }

    isTokenExpired(token?: string): boolean {
        if(!token) token = this.token;
        if(!token) return true;

        const date = this.getTokenExpirationDate(token);
        if(date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
        //return this._jwtHelper.isTokenExpired(token);
    }
}
