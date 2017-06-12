import { Action } from '@ngrx/store';
import { SettingsPayload } from './settings.model';
import { SettingsState } from './settings.reducer';

export const LIST_SETTINGS = '[Settings] List';
export const LIST_SETTINGS_SUCCESS = '[Settings] List Success';
export const LIST_SETTINGS_FAILURE = '[Settings] List Failure';
export const UPDATE_SETTINGS = '[Settings] Update';
export const UPDATE_SETTINGS_SUCCESS = '[Settings] Update Success';
export const UPDATE_SETTINGS_FAILURE = '[Settings] Update Failure';
export const OPEN_DRAWER = '[Settings:Layout] Open Drawer';
export const CLOSE_DRAWER = '[Settings:Layout] Close Drawer';
export const SET_TITLE = '[Settings:Title] Set title';
export const SET_MODULE = '[Settings:Title] Set module';
export const GET_MODULE_TITLE = '[Settings:Title] Get module and title';

export class ListSettingAction implements Action {
    readonly type = LIST_SETTINGS;
}

export class ListSettingSuccessAction implements Action {
    readonly type = LIST_SETTINGS_SUCCESS;
    constructor(public payload: any[]) { }
}

export class ListSettingFailureAction implements Action {
    readonly type = LIST_SETTINGS_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateSettingAction implements Action {
    readonly type = UPDATE_SETTINGS;
    constructor(public payload: SettingsPayload) { }
}

export class UpdateSettingSuccessAction implements Action {
    readonly type = UPDATE_SETTINGS_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateSettingFailureAction implements Action {
    readonly type = UPDATE_SETTINGS_FAILURE;
}

export class OpenDrawerAction implements Action {
    readonly type = OPEN_DRAWER;
}

export class CloseDrawerAction implements Action {
    readonly type = CLOSE_DRAWER;
}

export class SetTitleAction implements Action {
    readonly type = SET_TITLE;
}

export class SetModuleAction implements Action {
    readonly type = SET_MODULE;
}

export class GetModuleTitleAction implements Action {
    readonly type = GET_MODULE_TITLE;
}

export type SettingActions
    = ListSettingAction
    | ListSettingSuccessAction
    | ListSettingFailureAction
    | OpenDrawerAction
    | CloseDrawerAction
    | UpdateSettingAction
    | UpdateSettingSuccessAction
    | UpdateSettingFailureAction;
