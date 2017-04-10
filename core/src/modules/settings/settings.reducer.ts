import { SettingActions, settingActionTypes } from './settings.actions';

export interface SettingsState {
    layout: {
        showDrawer?: boolean
    };
    people: any;
    profile: any;
}

const initialState: SettingsState = {
    layout: {
        showDrawer: true
    },
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

        case settingActionTypes.CLOSE_DRAWER:
            return {
                layout: {
                    showDrawer: false
                },
                people: state.people,
                profile: state.profile
            };

        case settingActionTypes.OPEN_DRAWER:
            return {
                layout: {
                    showDrawer: true
                },
                people: state.people,
                profile: state.profile
            };

        default:
            return state;
    }
}

export const getLayoutSettings: any = (state: SettingsState) => state.layout;
export const getPeopleSettings: any = (state: SettingsState) => state.people;
export const getProfileSettings: any = (state: SettingsState) => state.profile;

export const getShowDrawer: any = (state: SettingsState) => state.layout.showDrawer;
