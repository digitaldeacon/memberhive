import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';

import * as interaction from 'mh-core';
import * as person from 'mh-core';
import * as settings from 'mh-core';

export interface AppState {
    interaction: interaction.InteractionState;
    person: person.PersonState;
    settings: settings.SettingsState;
}

const reducers: any = {
    interaction: interaction.interactionReducer,
    people: person.personReducer,
    settings: settings.settingsReducer
};

const developmentReducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<AppState> = combineReducers(reducers);

export function reducer(state: any, action: any): AppState {
    if (environment.production) {
        return productionReducer(state, action);
    } else {
        return developmentReducer(state, action);
    }
}

/**
 * People Reducers
 */
export const getPersonState: any = (state: AppState) => state.person;
export const getPeople: any = createSelector(getPersonState, person.getPeople);
/**
 * Settings Reducers
 */
export const getSettingsState: any = (state: AppState) => state.settings;
export const getLayoutSettings: any = createSelector(getSettingsState, settings.getLayoutSettings);
export const getPeopleSettings: any = createSelector(getSettingsState, settings.getPeopleSettings);
export const getProfileSettings: any = createSelector(getSettingsState, settings.getProfileSettings);
/**
 * Layout Settings Reducers
 */
export const getShowDrawer: any = createSelector(getSettingsState, settings.getShowDrawer);

export const getLoading: any = (state: AppState) => createSelector(getPersonState, person.getLoaded);
