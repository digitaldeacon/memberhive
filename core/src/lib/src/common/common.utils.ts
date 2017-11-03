import { isEmpty } from 'lodash.isempty';
import { HttpErrorResponse } from '@angular/common/http';

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
     * @param HttpErrorResponse r
     * @returns string
     * @deprecated
     */
    static responseErrors(r: HttpErrorResponse): string {
        // TODO: deprecate for an error interceptor (see: https://github.com/digitaldeacon/memberhive2/issues/158)
        let m = '';
        return m;
    }

    static arrayDiffObj(s: any[], v: any[], key: string) {
        let reducedIds = v.map((o) => o[key]);
        return s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
    }
}
