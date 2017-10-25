import { Injectable } from '@angular/core';
import {
    LocalStorageService,
    LocalStorage
} from 'ngx-webstorage';

@Injectable()
export class AuthService {
    @LocalStorage() private _token: string;
    @LocalStorage() private _uid: string;
    @LocalStorage() private _createdAt: Date;
    @LocalStorage() private _clientToken: string;

    constructor(private _storage: LocalStorageService) {}

    set token(token: string) {
        this._token = token;
    }
    get token(): string {
        return this._token;
    }

    set client(clientToken: string) {
        this._clientToken = clientToken;
    }
    get client(): string {
        return this._clientToken;
    }

    set personId(uid: string) {
        this._uid = uid;
        this._uid = this._uid; // because of issue with extension
    }
    get personId(): string {
        return this._uid;
    }

    set createdAt(dateTime: Date) {
        this._createdAt = dateTime;
    }
    get createdAt(): Date {
        return this._createdAt;
    }

    public clearStore(): void {
        this._storage.clear();
    }
}
