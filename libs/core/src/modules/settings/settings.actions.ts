import { Action } from '@ngrx/store';
import { ContextButton } from './settings.model';
import { SettingsState } from './settings.reducer';

export enum SettingsActionTypes {
  LIST_SETTINGS = '[Settings] List',
  LIST_SETTINGS_SUCCESS = '[Settings] List Success',
  LIST_SETTINGS_FAILURE = '[Settings] List Failure',
  UPDATE_SETTINGS = '[Settings] Update',
  UPDATE_SETTINGS_SUCCESS = '[Settings] Update Success',
  UPDATE_SETTINGS_FAILURE = '[Settings] Update Failure',
  TOGGLE_DRAWER = '[Settings:Layout] Toggle Drawer',
  SET_TITLE = '[Settings:Title] Set title',
  CLEAR_SETTINGS_MESSAGE = '[Settings] Clear Message',
  SET_CONTEXT_BUTTONS = '[Settings:Context Buttons] Set Context Buttons',
  SAVE_PEOPLE_FILTER = '[Settings:Filter] Save people filter'
}

export class ListSettingAction implements Action {
  readonly type = SettingsActionTypes.LIST_SETTINGS;
}

export class ListSettingSuccessAction implements Action {
  readonly type = SettingsActionTypes.LIST_SETTINGS_SUCCESS;
  constructor(public payload: SettingsState) {}
}

export class ListSettingFailureAction implements Action {
  readonly type = SettingsActionTypes.LIST_SETTINGS_FAILURE;
  constructor(public payload: any) {}
}

export class UpdateSettingAction implements Action {
  readonly type = SettingsActionTypes.UPDATE_SETTINGS;
  constructor(public payload: any) {}
}

export class UpdateSettingSuccessAction implements Action {
  readonly type = SettingsActionTypes.UPDATE_SETTINGS_SUCCESS;
  constructor(public payload: any) {}
}

export class UpdateSettingFailureAction implements Action {
  readonly type = SettingsActionTypes.UPDATE_SETTINGS_FAILURE;
  constructor(public payload: any) {}
}

export class ToggleDrawerAction implements Action {
  readonly type = SettingsActionTypes.TOGGLE_DRAWER;
  constructor(public payload: boolean) {}
}

export class SetTitleAction implements Action {
  readonly type = SettingsActionTypes.SET_TITLE;
  constructor(public payload: string) {}
}

export class ClearSettingsMessageAction implements Action {
  readonly type = SettingsActionTypes.CLEAR_SETTINGS_MESSAGE;
}

export class SetContextButtonsAction implements Action {
  readonly type = SettingsActionTypes.SET_CONTEXT_BUTTONS;
  constructor(public payload: ContextButton[]) {}
}

export class SavePeopleFilterAction implements Action {
  readonly type = SettingsActionTypes.SAVE_PEOPLE_FILTER;
  constructor(public payload: string) {}
}

export type SettingsActions =
  | ListSettingAction
  | ListSettingSuccessAction
  | ListSettingFailureAction
  | ToggleDrawerAction
  | UpdateSettingAction
  | UpdateSettingSuccessAction
  | UpdateSettingFailureAction
  | ClearSettingsMessageAction
  | SetTitleAction
  | SetContextButtonsAction
  | SetContextButtonsAction
  | SavePeopleFilterAction;
