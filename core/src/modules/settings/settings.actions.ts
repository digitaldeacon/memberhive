import { Action } from '@ngrx/store';
import { type } from '../../util';

export const settingActionTypes: any = {
    LIST:   type('[Setting] List'),
    LIST_SUCCESS:   type('[Setting] List Success'),
    UPDATE:  type('[Setting] Update')
};

export class ListSettingAction implements Action {
    type: any = settingActionTypes.LIST;
}

export class ListSettingSuccessAction implements Action {
    type: any = settingActionTypes.LIST_SUCCESS;
    constructor(public payload: any[]) { }
}

export class UpdateAction implements Action {
    type: any = settingActionTypes.UPDATE;
}

export type SettingActions
    = ListSettingAction
    | ListSettingSuccessAction;
