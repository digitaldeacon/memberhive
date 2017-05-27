import { Action } from '@ngrx/store';
import { type } from '../../util';

export const auditActionTypes: any = {
    LIST:           type('[Audit] List'),
    LIST_SUCCESS:   type('[Settings] List Success'),
    UPDATE:         type('[Settings] Update'),
    OPEN_DRAWER:    type('[Settings:Layout] Open Drawer'),
    CLOSE_DRAWER:   type('[Settings:Layout] Close Drawer'),
    SET_TITLE:          type('[Settings:Title] Set title'),
    SET_MODULE:         type('[Settings:Title] Set module'),
    GET_MODULE_TITLE:   type('[Settings:Title] Get module and title')
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

export class SetTitleAction implements Action {
    type: any = settingActionTypes.SET_TITLE;
}

export class SetModuleAction implements Action {
    type: any = settingActionTypes.SET_MODULE;
}

export class GetModuleTitleAction implements Action {
    type: any = settingActionTypes.GET_MODULE_TITLE;
}

export type SettingActions
    = ListSettingAction
    | ListSettingSuccessAction
    | OpenDrawerAction
    | CloseDrawerAction;
