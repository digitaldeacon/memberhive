import { isEmpty } from 'lodash';

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
}