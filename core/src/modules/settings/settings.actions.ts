import { Action } from '@ngrx/store';
import { type } from '../../util';

export const settingActionTypes: any = {
    LIST:           type('[Settings] List'),
    LIST_SUCCESS:   type('[Settings] List Success'),
    UPDATE:         type('[Settings] Update'),
    OPEN_DRAWER:    type('[Settings:Layout] Open Drawer'),
    CLOSE_DRAWER:   type('[Settings:Layout] Close Drawer')
};

export class ListSettingAction implements Action {
    type: any = settingActionTypes.LIST;
}

export class ListSettingSuccessAction implements Action {
    type: any = settingActionTypes.LIST_SUCCESS;
    constructor(public payload: any[]) { }
}

export class OpenDrawerAction implements Action {
    type: any = settingActionTypes.OPEN_DRAWER;
}

export class CloseDrawerAction implements Action {
    type: any = settingActionTypes.CLOSE_DRAWER;
}

export type SettingActions
    = ListSettingAction
    | ListSettingSuccessAction
    | OpenDrawerAction
    | CloseDrawerAction;
