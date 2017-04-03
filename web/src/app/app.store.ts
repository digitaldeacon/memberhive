import { createSelector } from 'reselect';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { compose } from '@ngrx/core/compose';
import { environment } from '../environments/environment';

import * as layout from 'mh-core';
import * as interaction from 'mh-core';

export interface AppState {
    layout: layout.LayoutState;
    interaction: interaction.InteractionState;
}

const reducers: any = {
    layout: layout.layoutReducer,
    inetraction: interaction.interactionReducer
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
