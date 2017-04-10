import { SettingActions, settingActionTypes } from './settings.actions';

export interface SettingsState {
    layout: any;
    people: any;
    profile: any;
}

const initialState: SettingsState = {
    layout: {},
    people: {},
    profile: {}
};

export function settingsReducer(state: SettingsState = initialState,
                              action: SettingActions): SettingsState {
    switch (action.type) {
        case settingActionTypes.LIST:
            return state;

        case settingActionTypes.UPDATE:
            return state;

        default:
            return state;
    }
}

export const getLayoutSettings: any = (state: SettingsState) => state.layout;
export const getPeopleSettings: any = (state: SettingsState) => state.people;
export const getProfileSettings: any = (state: SettingsState) => state.profile;
