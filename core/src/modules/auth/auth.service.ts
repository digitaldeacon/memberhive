import { Injectable } from '@angular/core';
import {
    LocalStorageService,
    LocalStorage } from 'ng2-webstorage';

@Injectable()
export class AuthService {
    @LocalStorage() private token: string;
    @LocalStorage() private uid: string;
    @LocalStorage() private createdAt: Date;

    constructor(private _storage: LocalStorageService) {}

    public setToken(token: string): void {
        this.token = token;
    }

    public getToken(): string {
        return this.token;
    }

    public setPersonId(uid: string): void {
        this.uid = uid;
        this.uid = this.uid; // because of issue with extension
    }

    public getPersonId(): string {
        return this.uid;
    }

    public setCreatedAt(dateTime: Date): void {
        this.createdAt = dateTime;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public clearStore(): void {
        this._storage.clear();
    }
}
