import { Action } from '@ngrx/store';
import { HttpResponse } from '@angular/common/http';
import { Tag } from './tag.model';

export const LIST_TAGS = '[Tags] List';
export const LIST_TAGS_SUCCESS = '[Tags] List Success';
export const LIST_TAGS_FAILURE = '[Tags] List Failure';
export const UPDATE_TAGS = '[Tags] Update Tags';
export const UPDATE_TAGS_SUCCESS = '[Tags] Update Tags Success';
export const UPDATE_TAGS_FAILURE = '[Tags] Update Tags Fail';

export class ListTagsAction implements Action {
  readonly type = LIST_TAGS;
  constructor(public payload: any) {}
}

export class ListTagsSuccessAction implements Action {
  readonly type = LIST_TAGS_SUCCESS;
  constructor(public payload: Tag[]) {}
}

export class ListTagsFailureAction implements Action {
  readonly type = LIST_TAGS_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}

export class UpdateTagsAction implements Action {
  readonly type = UPDATE_TAGS;
  constructor(public payload: Tag[]) {}
}

export class UpdateTagsSuccessAction implements Action {
  readonly type = UPDATE_TAGS_SUCCESS;
  constructor(public payload: Tag[]) {}
}

export class UpdateTagsFailureAction implements Action {
  readonly type = UPDATE_TAGS_FAILURE;
  constructor(public payload: HttpResponse<any>) {}
}

export type TagActions =
  | ListTagsAction
  | ListTagsSuccessAction
  | ListTagsFailureAction
  | UpdateTagsAction
  | UpdateTagsSuccessAction
  | UpdateTagsFailureAction;
