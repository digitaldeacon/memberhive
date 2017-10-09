import { Action } from '@ngrx/store';
import { Response } from '@angular/http';
import { Tag } from './tag.model';

export const LIST_TAGS = '[Tags] List';
export const LIST_TAGS_SUCCESS = '[Tags] List Success';
export const LIST_TAGS_FAILURE = '[Tags] List Failure';

export class ListTagsAction implements Action {
    readonly type = LIST_TAGS;
    constructor(public payload: any) { }
}

export class ListTagsSuccessAction implements Action {
    readonly type = LIST_TAGS_SUCCESS;
    constructor(public payload: Tag[]) { }
}

export class ListTagsFailureAction implements Action {
    readonly type = LIST_TAGS_FAILURE;
    constructor(public payload: Response) { }
}

export type TagActions =
    ListTagsAction
    | ListTagsSuccessAction
    | ListTagsFailureAction;
