import * as layout from './layout.actions';

export interface LayoutState {
    showDrawer: boolean;
}

const initialState: LayoutState = {
    showDrawer: true
};

export function layoutReducer(state: LayoutState = initialState,
action: layout.LayoutActions): LayoutState {
    switch (action.type) {
        case layout.layoutActionTypes.CLOSE_DRAWER:
            return {
                showDrawer: false
            };

        case layout.layoutActionTypes.OPEN_DRAWER:
            return {
                showDrawer: true
            };

        default:
            return state;
    }
}

export const getShowDrawer: any = (state: LayoutState) => state.showDrawer;
