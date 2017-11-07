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
import * as actions from './interaction.actions';
import { Interaction, InteractionPayload, InteractionCompletePayload } from './interaction.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class InteractionEffects {
    constructor(private _actions$: Actions,
                private _http: HttpService,
                private _auth: AuthService) {
    }

    @Effect()
    getInteractions$ = this._actions$
        .ofType(actions.LIST_INTERACTIONS)
        .map((action: actions.ListInteractionsAction) => action.payload)
        .switchMap((data: InteractionPayload) => {
            return this._http.get('interaction/list?')// + data.id
                // + '&noMarkup=' + data.noMarkup + '&me=' + data.me)
                .map((r: Interaction[]) => new actions.ListInteractionsSuccessAction(r))
                .catch((r: HttpResponse<any>) => of(new actions.ListInteractionsFailureAction(r)));
        });

    @Effect()
    addInteraction$ = this._actions$
        .ofType(actions.ADD_INTERACTION)
        .map((action: actions.AddInteractionAction) => action.payload)
        .switchMap((data: Interaction) => this._http.post('interaction/save-person', data)
            .map((r: Interaction) => new actions.AddInteractionSuccessAction(r))
            .catch((r: HttpResponse<any>) => of(new actions.AddInteractionFailureAction(r)))
        );

    @Effect()
    updateInteraction$ = this._actions$
        .ofType(actions.UPDATE_INTERACTION)
        .map((action: actions.UpdateInteractionAction) => action.payload)
        .switchMap((data: Interaction) => this._http.post('interaction/save-person', data)
            .map((r: Interaction) => new actions.UpdateInteractionSuccessAction(r))
            .catch((r: HttpResponse<any>) => of(new actions.UpdateInteractionFailureAction(r)))
        );

    @Effect()
    deleteInteraction$ = this._actions$
        .ofType(actions.DELETE_INTERACTION)
        .map((action: actions.DeleteInteractionAction) => action.payload)
        .switchMap((interactionId: number) => this._http.post('interaction/delete', {
            id: interactionId, author: this._auth.personId
            })
            .map((r: any) => new actions.DeleteInteractionSuccessAction(r))
            .catch((r: HttpResponse<any>) => of(new actions.DeleteInteractionFailureAction(r)))
        );

    @Effect()
    completeInteraction$ = this._actions$
      .ofType(actions.COMPLETE_INTERACTION)
      .map((action: actions.CompleteInteractionAction) => action.payload)
      .switchMap((payload: InteractionCompletePayload) => this._http.post('interaction/complete',
        {id: payload.id, author: this._auth.personId, complete: payload.complete})
        .map((r: Interaction) => new actions.UpdateInteractionSuccessAction(r))
        .catch((r: HttpResponse<any>) => of(new actions.UpdateInteractionFailureAction(r)))
      );
}
