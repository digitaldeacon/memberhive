import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Address, GeoCodes } from '../common/common.model';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';

export interface ServiceResults {
  results: any[];
  status: string;
}

@Injectable()
export class GeocodeService {
  private _apiKey: string;
  private _address: Address;
  private _errors: any;
  private _geoCodes: GeoCodes;

  constructor(private _http: HttpService) {}

  set apiKey(apiKey: string) {
    this._apiKey = apiKey;
  }

  set address(address: Address) {
    this._address = address;
  }

  calc(): Observable<any> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${this._formatAddress()}&key=${
      this._apiKey
    }`;
    if (!this._address.street && !this._address.zip && !this._address.city) {
      return empty();
    }
    return this._http.getRaw(url).map((res: ServiceResults) => {
      this._geoCodes = res.results[0].geometry.location;
      return this._geoCodes || undefined;
    });
  }

  get errors(): any {
    return this._errors;
  }

  get geoCodes(): GeoCodes {
    return this._geoCodes;
  }

  private _formatAddress(): string {
    let adr = '';

    if (!this._address) {
      return '';
    }

    adr = this._address.street ? this._address.street : '';
    adr += this._address.zip ? ', ' + this._address.zip : '';
    adr += this._address.city ? ' ' + this._address.city : '';

    return adr;
  }
}
