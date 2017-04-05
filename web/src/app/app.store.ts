import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';

import * as layout from 'mh-core';
import * as interaction from 'mh-core';
import * as people from 'mh-core';

export interface AppState {
    layout: layout.LayoutState;
    interaction: interaction.InteractionState;
    people: people.PeopleState;
}

const reducers: any = {
    layout: layout.layoutReducer,
    interaction: interaction.interactionReducer,
    people: people.peopleReducer
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
 * Layout Reducers
 */
export const getLayoutState: any = (state: AppState) => state.layout;
export const getShowDrawer: any = createSelector(getLayoutState, layout.getShowDrawer);
/**
 * People Reducers
 */
export const getPeopleState: any = (state: AppState) => state.people;
export const getPeople: any = createSelector(getPeopleState, people.getPeople);