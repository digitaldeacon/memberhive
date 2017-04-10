import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';

import * as interaction from 'mh-core';
import * as people from 'mh-core';
import * as settings from 'mh-core';

export interface AppState {
    interaction: interaction.InteractionState;
    people: people.PeopleState;
    settings: settings.SettingsState;
}

const reducers: any = {
    interaction: interaction.interactionReducer,
    people: people.peopleReducer,
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
export const getPeopleState: any = (state: AppState) => state.people;
export const getPeople: any = createSelector(getPeopleState, people.getPeople);
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