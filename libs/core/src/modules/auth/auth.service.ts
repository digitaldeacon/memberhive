import { Injectable } from "@angular/core";
import { HttpRequest } from "@angular/common/http";
import * as jwt_decode_ from "jwt-decode";
import * as localForage from "localforage";

const jwt_decode = jwt_decode_;

const TOKEN = "token";
const CLIENT = "client";
const UID = "uid";
const CREATEDAT = "createdAt";

@Injectable()
export class AuthService {
  private _token: string = "";
  private _clientToken: string = "";
  private _uid: string = "";
  private _createdAt: Date = null;
  private _cachedRequests: Array<HttpRequest<any>> = [];

  constructor() {}

  set token(token: string) {
    this._token = token;
    localForage.setItem(TOKEN, token);
  }
  get token(): string {
    if (!this._token) {
      localForage.getItem(TOKEN).then((val: string) => {
        this._token = val;
      });
    }
    return this._token;
  }

  set personId(uid: string) {
    localForage.setItem(UID, uid);
    this._uid = uid;
  }
  get personId(): string {
    localForage
      .getItem(UID)
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
    localForage
      .getItem(CREATEDAT)
      .then((val: Date) => {
        this._createdAt = val;
      })
      .catch((err: any) => {
        // console.log('Error fetching from forage:', err);
      });
    return this._createdAt;
  }

  clearStore(): Promise<void> {
    this.createdAt = undefined;
    this._cachedRequests = [];
    this.token = "";
    this.personId = "";
    return localForage.clear();
  }

  getTokenExpirationDate(): Date {
    if (!this.token) {
      return undefined;
    }
    const decoded: any = jwt_decode(this.token);
    if (!decoded.hasOwnProperty("exp")) {
      return undefined;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(): boolean {
    if (!this.token) return true;
    const date = this.getTokenExpirationDate();
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }

  collectFailedRequest(request): void {
    this._cachedRequests.push(request);
  }

  retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
    // console.log(this._cachedRequests);
  }
}
