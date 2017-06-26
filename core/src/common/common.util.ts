import { Injectable } from '@angular/core';
import { Address } from './common.model';

@Injectable()
export class Util {
    addressIsEqual(adr1: Address, adr2: Address): boolean {
        return ((adr1.street === adr2.street) &&
        (adr1.city === adr2.city) &&
        (adr1.zip === adr2.zip));
    }
}