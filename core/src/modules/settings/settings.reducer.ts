import * as actions from './settings.actions';

export interface SettingsState {
    loaded: boolean;
    loading: boolean;
    layout: {
        showDrawer?: boolean
    };
    people: {
        list?: Array<string>
    };
    profile: any;
}

const initialState: SettingsState = {
    loaded: false,
    loading: false,
    layout: {
        showDrawer: true
    },
    people: {
        list: ['fullName', 'email']
    },
    profile: {}
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

        case actions.UPDATE_SETTINGS_SUCCESS: {
            const peopleList: any = state.people.list;

            if (action.payload) {
                // something
            }

            return {
                loaded: true,
                loading: false,
                layout: state.layout,
                people: {
                    list: peopleList
                },
                profile: state.profile
            };
        }

        case actions.CLOSE_DRAWER: {
            return {
                loaded: false,
                loading: false,
                layout: {
                    showDrawer: false
                },
                people: state.people,
                profile: state.profile
            };
        }

        case actions.OPEN_DRAWER: {
            return {
                loaded: false,
                loading: false,
                layout: {
                    showDrawer: true
                },
                people: state.people,
                profile: state.profile
            };
        }

        default:
            return state;
    }
}

export const getLayoutSettings: any = (state: SettingsState) => state.layout;
export const getPeopleSettings: any = (state: SettingsState) => state.people;
export const getProfileSettings: any = (state: SettingsState) => state.profile;

export const getShowDrawer: any = (state: SettingsState) => state.layout.showDrawer;
