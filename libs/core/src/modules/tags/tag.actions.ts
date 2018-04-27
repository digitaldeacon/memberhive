import { Action } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { Tag } from './tag.model';

export enum TagActionTypes {
  LIST_TAGS = '[Tags] List',
  LIST_TAGS_SUCCESS = '[Tags] List Success',
  LIST_TAGS_FAILURE = '[Tags] List Failure',
  UPDATE_TAGS = '[Tags] Update Tags',
  UPDATE_TAGS_SUCCESS = '[Tags] Update Tags Success',
  UPDATE_TAGS_FAILURE = '[Tags] Update Tags Fail'
}

export class ListTagsAction implements Action {
  readonly type = TagActionTypes.LIST_TAGS;
  constructor(public payload: any) {}
}

export class ListTagsSuccessAction implements Action {
  readonly type = TagActionTypes.LIST_TAGS_SUCCESS;
  constructor(public payload: Tag[]) {}
}

export class ListTagsFailureAction implements Action {
  readonly type = TagActionTypes.LIST_TAGS_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}

export class UpdateTagsAction implements Action {
  readonly type = TagActionTypes.UPDATE_TAGS;
  constructor(public payload: Tag[]) {}
}

export class UpdateTagsSuccessAction implements Action {
  readonly type = TagActionTypes.UPDATE_TAGS_SUCCESS;
  constructor(public payload: Tag[]) {}
}

export class UpdateTagsFailureAction implements Action {
  readonly type = TagActionTypes.UPDATE_TAGS_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}

export type TagActions =
  | ListTagsAction
  | ListTagsSuccessAction
  | ListTagsFailureAction
  | UpdateTagsAction
  | UpdateTagsSuccessAction
  | UpdateTagsFailureAction;
