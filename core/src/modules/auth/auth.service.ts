import { Injectable } from '@angular/core';
import { LocalStorageService, LocalStorage } from 'ngx-webstorage';
import * as jwt_decode_ from 'jwt-decode';
import * as localForage from 'localforage';

const jwt_decode = jwt_decode_;

const TOKEN = 'token';
const CLIENT = 'client';
const UID = 'uid';
const CREATEDAT = 'createdAt';

@Injectable()
export class AuthService {
    @LocalStorage()
    private _token: string;
    @LocalStorage()
    private _clientToken: string;
    @LocalStorage()
    private _uid: string;
    @LocalStorage()
    private _createdAt: Date;

    constructor(private _storage: LocalStorageService) {}

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
        this._uid = this._uid; // because of issue with extension
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
        this._storage.clear();
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: any = jwt_decode(token);

        // console.log('token exp date', decoded.exp);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token: string = this.token): boolean {
        let date = this.getTokenExpirationDate(token);

        // console.log('Token Exp Date is:', date);
        if (date === null) {
            return false;
        }
        return !(date.valueOf() > new Date().valueOf());
    }
}
