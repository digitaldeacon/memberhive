import { Action } from '@ngrx/store';
import { SettingsPayload } from './settings.model';
import { SettingsState } from './settings.reducer';

export const LIST_SETTINGS: string = '[Settings] List';
export const LIST_SETTINGS_SUCCESS: string = '[Settings] List Success';
export const LIST_SETTINGS_FAILURE: string = '[Settings] List Failure';
export const UPDATE_SETTINGS: string = '[Settings] Update';
export const UPDATE_SETTINGS_SUCCESS: string = '[Settings] Update Success';
export const UPDATE_SETTINGS_FAILURE: string = '[Settings] Update Failure';
export const OPEN_DRAWER: string = '[Settings:Layout] Open Drawer';
export const CLOSE_DRAWER: string = '[Settings:Layout] Close Drawer';
export const SET_TITLE: string = '[Settings:Title] Set title';
export const SET_MODULE: string = '[Settings:Title] Set module';
export const GET_MODULE_TITLE: string = '[Settings:Title] Get module and title';

export class ListSettingAction implements Action {
    readonly type: string = LIST_SETTINGS;
    constructor(public payload?: number) { }
}

export class ListSettingSuccessAction implements Action {
    readonly type: string = LIST_SETTINGS_SUCCESS;
    constructor(public payload: any[]) { }
}

export class ListSettingFailureAction implements Action {
    readonly type: string = LIST_SETTINGS_FAILURE;
    constructor(public payload: any) { }
}

export class UpdateSettingAction implements Action {
    readonly type: string = UPDATE_SETTINGS;
    constructor(public payload: SettingsPayload) { }
}

export class UpdateSettingSuccessAction implements Action {
    readonly type: string = UPDATE_SETTINGS_SUCCESS;
    constructor(public payload: any) { }
}

export class UpdateSettingFailureAction implements Action {
    readonly type: string = UPDATE_SETTINGS_FAILURE;
    constructor(public payload?: any) { }
}

export class OpenDrawerAction implements Action {
    readonly type: string = OPEN_DRAWER;
    constructor(public payload?: number) { }
}

export class CloseDrawerAction implements Action {
    readonly type: string = CLOSE_DRAWER;
    constructor(public payload?: number) { }
}

export class SetTitleAction implements Action {
    readonly type: string = SET_TITLE;
}

export class SetModuleAction implements Action {
    readonly type: string = SET_MODULE;
}

export class GetModuleTitleAction implements Action {
    readonly type: string = GET_MODULE_TITLE;
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
