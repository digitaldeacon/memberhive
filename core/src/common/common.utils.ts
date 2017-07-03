import { isEmpty } from 'lodash';
import { Response } from '@angular/http';

export class Utils {
    static objEmptyProperties(o: any, part: string, search: string[] | string = ''): boolean {
        if (!o || !o.hasOwnProperty(part)) {
            return true;
        }
        if (typeof search === 'string') {
            if (search === '') {
                return isEmpty(o[part]);
            }
            return isEmpty(o[part][search]);
        } else {
            for (let s of search) {
                if (isEmpty(o[part][s])) {
                    return true;
                }
            }
        }
        return false;
    }

    static responseErrors(r: Response): string {
        const rBody: any = JSON.parse(r.text());
        const messages: any = JSON.parse(rBody.message);
        let m: string = '';
        for (let key of Object.keys(messages)) {
            m += messages[key];
        }
        return m;
    }
}