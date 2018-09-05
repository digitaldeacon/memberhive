import { SettingsActions, SettingsActionTypes } from './settings.actions';
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
  awaitFormSubmit?: boolean;
}

const initialState: SettingsState = {
  loaded: false,
  loading: false,
  layout: {
    showDrawer: true,
    title: '',
    module: ''
  },
  people: {
    list: ['email'],
    filter: {
      term: '',
      saved: []
    }
  },
  system: {
    churchName: 'Your Church',
    googleApiKey: 'AIzaSyDT14mzMDZMtIwMXa1zNUOxqVYYylPvLIo'
  },
  profile: {},
  dashboard: {},
  awaitFormSubmit: false
};

export function settingsReducer(state: SettingsState = initialState, action: SettingsActions): SettingsState {
  switch (action.type) {
    case SettingsActionTypes.DELETE_PEOPLE_FILTER:
    case SettingsActionTypes.SAVE_PEOPLE_FILTER:
    case SettingsActionTypes.LIST_SETTINGS:
    case SettingsActionTypes.UPDATE_SETTINGS: {
      return Object.assign({}, state, {
        loading: true
      });
    }

    case SettingsActionTypes.CLEAR_SETTINGS_MESSAGE:
      return Object.assign({}, state, {
        message: undefined
      });

    case SettingsActionTypes.LIST_SETTINGS_SUCCESS: {
      const settings: SettingsState = action.payload;
      settings.loading = false;
      settings.loaded = true;
      return Object.assign({}, state, settings);
    }

    case SettingsActionTypes.UPDATE_SETTINGS_FAILURE:
    case SettingsActionTypes.LIST_SETTINGS_FAILURE: {
      const message: common.Message = {
        type: common.MessageType.FAILURE,
        text: 'Setting failure: ' + action.payload // TODO: @I18n
      };
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        message: message
      });
    }

    case SettingsActionTypes.UPDATE_SETTINGS_SUCCESS: {
      const payload: SettingsState = action.payload;
      const types = Object.keys(payload);
      const values = (<any>Object).values(payload);

      let msg: common.Message = {
        type: common.MessageType.SUCCESS,
        text: 'Successfully updated settings' // TODO: @I18n
      };
      let system: model.SystemSettings = state.system;
      let people: model.PersonSettings = state.people;
      let layout: model.LayoutSettings = state.layout;

      let i = 0;
      for (const section of types) {
        if (section === model.SettingType.PEOPLE) {
          people = Object.assign({}, state.people, values[i]);
        }
        if (section === model.SettingType.SYSTEM) {
          system = Object.assign({}, state.system, values[i]);
        }
        if (section === model.SettingType.LAYOUT) {
          msg = undefined;
          layout = Object.assign({}, state.layout, values[i]);
        }
        i++;
      }

      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        message: msg,
        layout: layout,
        people: people,
        system: system,
        profile: state.profile,
        dashboard: state.dashboard
      });
    }

    case SettingsActionTypes.TOGGLE_DRAWER: {
      return Object.assign({}, state, {
        layout: {
          showDrawer: action.payload,
          contextButtons: state.layout.contextButtons
        }
      });
    }

    case SettingsActionTypes.SET_CONTEXT_BUTTONS: {
      return Object.assign({}, state, {
        layout: {
          showDrawer: state.layout.showDrawer,
          title: state.layout.title,
          contextButtons: action.payload
        }
      });
    }

    case SettingsActionTypes.PERSIST_PEOPLE_FILTER: {
      const savedFilters = state.people.hasOwnProperty('filter') ? state.people.filter.saved : [];
      return Object.assign({}, state, {
        people: {
          list: state.people.list,
          filter: {
            term: action.payload,
            saved: savedFilters
          }
        }
      });
    }

    case SettingsActionTypes.SAVE_PEOPLE_FILTER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        people: {
          list: state.people.list,
          filter: {
            term: state.people.filter.term,
            saved: [...state.people.filter.saved, action.payload]
          }
        }
      });
    }

    case SettingsActionTypes.DELETE_PEOPLE_FILTER_SUCCESS: {
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        people: {
          list: state.people.list,
          filter: {
            term: state.people.filter.term,
            saved: state.people.filter.saved.filter((term: string) => term !== action.payload)
          }
        }
      });
    }

    case SettingsActionTypes.SET_TITLE: {
      return Object.assign({}, state, {
        layout: {
          showDrawer: state.layout.showDrawer,
          title: action.payload,
          contextButtons: state.layout.contextButtons
        }
      });
    }

    case SettingsActionTypes.AWAIT_FORM_SUBMIT: {
      return Object.assign({}, state, {
        awaitFormSubmit: action.payload
      });
    }

    default:
      return state;
  }
}

export const loadedSettings: any = (state: SettingsState) => state.loaded;
export const loadingSettings: any = (state: SettingsState) => state.loading;
export const messageSettings: any = (state: SettingsState) => state.message;

export const layoutSettings: any = (state: SettingsState) => state.layout;
export const peopleSettings: any = (state: SettingsState) => state.people;
export const sysSettings: any = (state: SettingsState) => state.system;
export const peopleListSettings: any = (state: SettingsState) => state.people.list;
export const profileSettings: any = (state: SettingsState) => state.profile;

export const showDrawer: any = (state: SettingsState) => state.layout.showDrawer;
export const title: any = (state: SettingsState) => state.layout.title;
export const module: any = (state: SettingsState) => state.layout.module;
export const contextButtons: any = (state: SettingsState) => state.layout.contextButtons;

export const sysGoogleKey: any = (state: SettingsState) => state.system.googleApiKey;

export const peopleFilterSettings: any = (state: SettingsState) => state.people.filter;

export const awaitingFormSubmit: any = (state: SettingsState) => state.awaitFormSubmit;
