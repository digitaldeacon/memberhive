import * as actions from './settings.actions';
import * as model from './settings.model';
import * as common from '../../common/common.model';

export interface SettingsState {
    loaded?: boolean;
    loading?: boolean;
    message?: common.Message;
    layout?: model.LayoutSettings;
    people?: model.PersonSettings;
    system?: model.SystemSettings;
    profile?: any;
    dashboard?: any;
}

const initialState: SettingsState = {
    loaded: false,
    loading: false,
    layout: {
        showDrawer: true
    },
    people: {
        list: ['email'],
        maritalStatus: ['single', 'engaged', 'married', 'widowed', 'separated', 'divorced']
    },
    system: {
        churchName: 'Your Church',
        googleApiKey: 'AIzaSyDT14mzMDZMtIwMXa1zNUOxqVYYylPvLIo'
    },
    profile: {},
    dashboard: {}
};

export function settingsReducer(state: SettingsState = initialState,
                                action: actions.SettingActions): SettingsState {
    switch (action.type) {
        case actions.LIST_SETTINGS:
        case actions.UPDATE_SETTINGS: {
            return Object.assign({}, state, {
                loading: true
            });
        }

        case actions.CLEAR_SETTINGS_MESSAGE:
            return Object.assign({}, state, {
                message: undefined
            });

        case actions.LIST_SETTINGS_SUCCESS: {
            const settings: SettingsState = action.payload;
            settings.loading = false;
            settings.loaded = true;
            return Object.assign({}, state, settings);
        }

        case actions.UPDATE_SETTINGS_FAILURE:
        case actions.LIST_SETTINGS_FAILURE: {
            let message: common.Message = {
                type: common.MESSAGE_FAILURE,
                text: 'Setting failure: ' + action.payload // TODO: add to i18n
            };
            return Object.assign({}, state, {
                loading: false,
                loaded: false,
                message: message
            });
        }

        case actions.UPDATE_SETTINGS_SUCCESS: {
            const payload: SettingsState = action.payload;
            const types = Object.keys(payload);
            const values = (<any>Object).values(payload);

            let message: common.Message = {
                type: common.MESSAGE_SUCCESS,
                text: 'Successfully updated settings' // TODO: add to i18n
            };
            let system: model.SystemSettings = state.system;
            let people: model.PersonSettings = state.people;
            let layout: model.LayoutSettings = state.layout;

            let i = 0;
            for (let section of types) {
                if (section === model.SettingType[model.SettingType.people]) {
                    people = Object.assign({}, state.people, values[i]);
                }
                if (section === model.SettingType[model.SettingType.system]) {
                    system = Object.assign({}, state.system, values[i]);
                }
                if (section === model.SettingType[model.SettingType.layout]) {
                    message = undefined;
                    layout = Object.assign({}, state.layout, values[i]);
                }
                i++;
            }

            return Object.assign({}, state, {
                loading: false,
                loaded: true,
                message: message,
                layout: layout,
                people: people,
                system: system,
                profile: state.profile,
                dashboard: state.dashboard
            });
        }

        case actions.TOGGLE_DRAWER: {
            return Object.assign({}, state, {
                layout: {
                    showDrawer: action.payload,
                    contextButtons: state.layout.contextButtons
                }
            });
        }

        case actions.SET_CONTEXT_BUTTONS: {
            return Object.assign({}, state, {
                layout: {
                    showDrawer: state.layout.showDrawer,
                    contextButtons: action.payload
                }
            });
        }

        default:
            return state;
    }
}

export const getLoadedSettings: any = (state: SettingsState) => state.loaded;
export const getLoadingSettings: any = (state: SettingsState) => state.loading;
export const getMessageSettings: any = (state: SettingsState) => state.message;

export const getLayoutSettings: any = (state: SettingsState) => state.layout;
export const getPeopleSettings: any = (state: SettingsState) => state.people;
export const getSysSettings: any = (state: SettingsState) => state.system;
export const getPeopleListSettings: any = (state: SettingsState) => state.people.list;
export const getProfileSettings: any = (state: SettingsState) => state.profile;

export const getShowDrawer: any = (state: SettingsState) => state.layout.showDrawer;
export const getContextButtons: any = (state: SettingsState) => state.layout.contextButtons;
export const getSysGoogleKey: any = (state: SettingsState) => state.system.googleApiKey;
