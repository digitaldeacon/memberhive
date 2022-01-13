import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { catchError, map, mergeMap, concatMap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  InteractionActionTypes,
  ListInteractionsAction,
  ListInteractionsSuccessAction,
  ListInteractionsFailureAction,
  AddInteractionAction,
  AddInteractionSuccessAction,
  AddInteractionFailureAction,
  UpdateInteractionAction,
  UpdateInteractionSuccessAction,
  UpdateInteractionFailureAction,
  DeleteInteractionAction,
  DeleteInteractionSuccessAction,
  DeleteInteractionFailureAction,
  CompleteInteractionAction,
} from './interaction.actions';
import { Interaction, InteractionPayload, InteractionCompletePayload } from './interaction.model';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class InteractionEffects {
  constructor(private _actions$: Actions, private _http: HttpService, private _auth: AuthService) {}

  @Effect()
  getInteractions$ = this._actions$.pipe(
    ofType<ListInteractionsAction>(InteractionActionTypes.LIST_INTERACTIONS),
    map((action: ListInteractionsAction) => action.payload),
    switchMap((data: InteractionPayload) =>
      this._http.get('interaction/list?').pipe(
        map((r: Interaction[]) => new ListInteractionsSuccessAction(r)),
        catchError((r: HttpResponse<any>) => of(new ListInteractionsFailureAction(r)))
      )
    )
  );

  @Effect()
  addInteraction$ = this._actions$.pipe(
    ofType<AddInteractionAction>(InteractionActionTypes.ADD_INTERACTION),
    map((action: AddInteractionAction) => action.payload),
    switchMap((data: Interaction) =>
      this._http.post('interaction/save-person', data).pipe(
        map((r: Interaction) => new AddInteractionSuccessAction(r)),
        catchError((r: HttpResponse<any>) => of(new AddInteractionFailureAction(r)))
      )
    )
  );

  @Effect()
  updateInteraction$ = this._actions$.pipe(
    ofType<UpdateInteractionAction>(InteractionActionTypes.UPDATE_INTERACTION),
    map((action: UpdateInteractionAction) => action.payload),
    switchMap((data: Interaction) =>
      this._http.post('interaction/save-person', data).pipe(
        map((r: Interaction) => new UpdateInteractionSuccessAction(r)),
        catchError((r: HttpResponse<any>) => of(new UpdateInteractionFailureAction(r)))
      )
    )
  );

  @Effect()
  deleteInteraction$ = this._actions$.pipe(
    ofType<DeleteInteractionAction>(InteractionActionTypes.DELETE_INTERACTION),
    map((action: DeleteInteractionAction) => action.payload),
    switchMap((interactionId: number) =>
      this._http
        .post('interaction/delete', {
          id: interactionId,
          author: this._auth.personId,
        })
        .pipe(
          map((r: any) => new DeleteInteractionSuccessAction(r)),
          catchError((r: HttpResponse<any>) => of(new DeleteInteractionFailureAction(r)))
        )
    )
  );

  @Effect()
  completeInteraction$ = this._actions$.pipe(
    ofType<CompleteInteractionAction>(InteractionActionTypes.COMPLETE_INTERACTION),
    map((action: CompleteInteractionAction) => action.payload),
    switchMap((payload: InteractionCompletePayload) =>
      this._http
        .post('interaction/complete', {
          id: payload.id,
          author: this._auth.personId,
          complete: payload.complete,
        })
        .pipe(
          map((r: Interaction) => new UpdateInteractionSuccessAction(r)),
          catchError((r: HttpResponse<any>) => of(new UpdateInteractionFailureAction(r)))
        )
    )
  );
}
