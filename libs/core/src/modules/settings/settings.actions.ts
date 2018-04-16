import { Action } from "@ngrx/store";
import { ContextButton, SettingsPayload } from "./settings.model";
import { SettingsState } from "./settings.reducer";
import { Filter } from "../../common/common.model";

export enum SettingsActionTypes {
  LIST_SETTINGS = "[Settings] List",
  LIST_SETTINGS_SUCCESS = "[Settings] List Success",
  LIST_SETTINGS_FAILURE = "[Settings] List Failure",
  UPDATE_SETTINGS = "[Settings] Update",
  UPDATE_PERSONAL_SETTINGS = "[Settings] Update personal settings",
  UPDATE_SETTINGS_SUCCESS = "[Settings] Update Success",
  UPDATE_SETTINGS_FAILURE = "[Settings] Update Failure",
  TOGGLE_DRAWER = "[Settings:Layout] Toggle Drawer",
  SET_TITLE = "[Settings:Title] Set title",
  CLEAR_SETTINGS_MESSAGE = "[Settings] Clear Message",
  SET_CONTEXT_BUTTONS = "[Settings:Context Buttons] Set Context Buttons",
  SAVE_PEOPLE_FILTER = "[Settings:Filter] Save people filter",
  SAVE_PEOPLE_FILTER_SUCCESS = "[Settings:Filter] Save people filter success",
  PERSIST_PEOPLE_FILTER = "[Settings:Filter] Persist people filter",
  DELETE_PEOPLE_FILTER = "[Settings:Filter] Delete people filter",
  DELETE_PEOPLE_FILTER_SUCCESS = "[Settings:Filter] Delete people filter success"
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

export class UpdatePersonalSettingAction implements Action {
  readonly type = SettingsActionTypes.UPDATE_PERSONAL_SETTINGS;
  constructor(public payload: SettingsPayload) {}
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

export class PersistPeopleFilterAction implements Action {
  readonly type = SettingsActionTypes.PERSIST_PEOPLE_FILTER;
  constructor(public payload: string) {}
}

export class SavePeopleFilterAction implements Action {
  readonly type = SettingsActionTypes.SAVE_PEOPLE_FILTER;
  constructor(public payload: Filter) {}
}

export class DeletePeopleFilterAction implements Action {
  readonly type = SettingsActionTypes.DELETE_PEOPLE_FILTER;
  constructor(public payload: string) {}
}

export class DeletePeopleFilterSuccessAction implements Action {
  readonly type = SettingsActionTypes.DELETE_PEOPLE_FILTER_SUCCESS;
  constructor(public payload: string) {}
}

export class SavePeopleFilterSuccessAction implements Action {
  readonly type = SettingsActionTypes.SAVE_PEOPLE_FILTER_SUCCESS;
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
  | SavePeopleFilterAction
  | PersistPeopleFilterAction
  | UpdatePersonalSettingAction
  | DeletePeopleFilterAction
  | DeletePeopleFilterSuccessAction
  | SavePeopleFilterSuccessAction;
