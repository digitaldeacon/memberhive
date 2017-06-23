import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Address, GeoCodes } from '../common/common.model';
import { Observable } from 'rxjs';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

@Injectable()
export class GeocodeService {
    private _apiKey: string;
    private _address: Address;
    private _errors: any;
    private _geoCodes: GeoCodes;

    constructor(private _http: HttpService) {
    }

    set apiKey(apiKey: string) {
        this._apiKey = apiKey;
    }

    set address(address: Address) {
        this._address = address;
    }

    calc(): Observable<any> {
        let url: string = `https://maps.googleapis.com/maps/api/geocode/json?address=${this._formatAddress()}&key=${this._apiKey}`;

        if (!this._address.street &&
            !this._address.zip &&
            !this._address.city) {
            return empty();
        }

        return this._http.getRaw(url)
            .map((res: any) => {
                const response: any = JSON.parse(res.text());
                this._geoCodes = response.results[0].geometry.location;
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
        let adr: string = '';

        if (!this._address) {
            return '';
        }

        adr = this._address.street ? this._address.street : '';
        adr += this._address.zip ? ', ' + this._address.zip : '';
        adr += this._address.city ? ' ' + this._address.city : '';

        return adr;
    }
}
