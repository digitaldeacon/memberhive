// tslint:disable: no-unused-variable
import { isEmpty } from "lodash";
// tslint:enable: no-unused-variable

export class Utils {
  static objEmptyProperties(
    o: any,
    part: string,
    search: string[] | string = ""
  ): boolean {
    if (!o || !o.hasOwnProperty(part)) {
      return true;
    }
    if (typeof search === "string") {
      if (search === "") {
        return isEmpty(o[part]);
      }
      return isEmpty(o[part][search]);
    } else {
      for (const s of search) {
        if (isEmpty(o[part][s])) {
          return true;
        }
      }
    }
    return false;
  }

  static arrayDiffObj(s: any[], v: any[], key: string) {
    const reducedIds = v.map(o => o[key]);
    return s.filter((obj: any) => reducedIds.indexOf(obj[key]) === -1);
  }
}
