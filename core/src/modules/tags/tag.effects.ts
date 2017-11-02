import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import * as actions from './tag.actions';
import { Tag} from './tag.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class TagEffects {
    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _auth: AuthService) {
    }

    @Effect()
    getTags$ = this._actions$
        .ofType(actions.LIST_TAGS)
        .map((action: actions.ListTagsAction) => action.payload)
        .switchMap((data: any) => {
            return this._http.get('tag/list')
                .map((r: Tag[]) => new actions.ListTagsSuccessAction(r))
                .catch((r: HttpResponse<any>) => of(new actions.ListTagsFailureAction(r)));
        });
}
