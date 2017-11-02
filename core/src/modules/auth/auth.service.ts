import { Injectable } from '@angular/core';
import * as jwt_decode_ from 'jwt-decode';
import * as localForage from 'localforage';

const jwt_decode = jwt_decode_;

const TOKEN = 'token';
const CLIENT = 'client';
const UID = 'uid';
const CREATEDAT = 'createdAt';

@Injectable()
export class AuthService {
    private _token: string = '';
    private _clientToken: string = '';
    private _uid: string = '';
    private _createdAt: Date = null;

    constructor() {}

    set token(token: string) {
        this._token = token;
        localForage.setItem(TOKEN, token);
    }
    get token(): string {
        localForage.getItem(TOKEN)
            .then((val: string) => {
                this._token = val;
            })
            .catch((err: any) => {
                // console.log('Error fetching from forage:', err);
        });
        return this._token;
    }

    set client(token: string) {
        localForage.setItem(CLIENT, token);
        this._clientToken = token;
    }
    get client(): string {
        localForage.getItem(CLIENT)
            .then((val: string) => {
                this._clientToken = val;
            })
            .catch((err: any) => {
                // console.log('Error fetching from forage:', err);
            });
        return this._clientToken;
    }

    set personId(uid: string) {
        localForage.setItem(UID, uid);
        this._uid = uid;
    }
    get personId(): string {
        localForage.getItem(UID)
            .then((val: string) => {
                this._uid = val;
            })
            .catch((err: any) => {
                // console.log('Error fetching from forage:', err);
            });
        return this._uid;
    }

    set createdAt(dateTime: Date) {
        localForage.setItem(CREATEDAT, dateTime);
        this._createdAt = dateTime;
    }
    get createdAt(): Date {
        localForage.getItem(CREATEDAT)
            .then((val: Date) => {
                this._createdAt = val;
            })
            .catch((err: any) => {
                // console.log('Error fetching from forage:', err);
            });
        return this._createdAt;
    }

    clearStore(): void {
        localForage.clear();
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token: string = this.token): boolean {
        if (!token) return true;
        let date = this.getTokenExpirationDate(token);

        // console.log('Token Exp Date is:', date);
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }
}
