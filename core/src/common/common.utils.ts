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

    /**
     *
     * @param {Response} r
     * @returns {string}
     * @deprecated
     */
    static responseErrors(r: Response): string {
        // TODO: deprecate for an error interceptor (see: https://github.com/digitaldeacon/memberhive2/issues/158)
        const rBody: any = JSON.parse( (r instanceof Response) ? r.text() : r);
        const messages: any = JSON.parse(rBody.message);
        let m = '';
        for (let key of Object.keys(messages)) {
            m += messages[key];
        }
        return '';
    }

    static arrayDiffObj(s: any[], v: any[], key: string) {
        let reducedIds = v.map((o) => o[key]);
        return s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
    }
}
