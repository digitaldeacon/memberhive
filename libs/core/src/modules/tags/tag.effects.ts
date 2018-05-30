import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { ListTagsAction, TagActionTypes, ListTagsSuccessAction, ListTagsFailureAction } from './tag.actions';
import { Tag } from './tag.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class TagEffects {
  constructor(private _actions$: Actions, private _http: HttpService, private _auth: AuthService) {}

  @Effect()
  getTags$ = this._actions$.pipe(
    ofType<ListTagsAction>(TagActionTypes.LIST_TAGS),
    map(action => action.payload),
    switchMap((data: any) => {
      return this._http.get('tag/list').pipe(
        map((r: Tag[]) => new ListTagsSuccessAction(r)),
        catchError((r: HttpResponse<any>) => of(new ListTagsFailureAction(r)))
      );
    })
  );
}
