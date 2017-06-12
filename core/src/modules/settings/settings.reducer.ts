import * as actions from './settings.actions';
import { createSelector } from '@ngrx/store';

export interface SettingsState {
    loaded?: boolean;
    loading?: boolean;
    layout?: {
        showDrawer?: boolean
    };
    people?: {
        list?: any
    };
    profile?: any;
    system?: any;
    dashboard?: any;
}

const initialState: SettingsState = {
    loaded: false,
    loading: false,
    layout: {
        showDrawer: true
    },
    people: {
        list: ['email']
    },
    profile: {},
    system: {},
    dashboard: {}
};

export function settingsReducer(state: SettingsState = initialState,
                                action: actions.SettingActions): SettingsState {
    switch (action.type) {
        case actions.LIST_SETTINGS: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case actions.LIST_SETTINGS_SUCCESS: {
            const settings: SettingsState = action.payload;
            return Object.assign({}, state, settings);
        }

        case actions.UPDATE_SETTINGS: {
            const payload: SettingsState = action.payload;
            return Object.assign({}, state, payload);
        }

        case actions.TOGGLE_DRAWER: {
            console.log(action.payload);
            return Object.assign({}, state.layout, {
                showDrawer: action.payload
            });
        }

        default:
            return state;
    }
}

export const getLayoutSettings: any = (state: SettingsState) => state.layout;
export const getPeopleSettings: any = (state: SettingsState) => state.people;
export const getSysSettings: any = (state: SettingsState) => state.system;
export const getPeopleListSettings: any = (state: SettingsState) => state.people.list;
export const getProfileSettings: any = (state: SettingsState) => state.profile;

export const getShowDrawer: any = (state: SettingsState) => state.layout.showDrawer;
//export const getShowDrawer = createSelector(getLayoutSettings, (state: SettingsState) => state.layout.showDrawer);
