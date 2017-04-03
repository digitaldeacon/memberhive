import * as layout from './layout.actions';


export interface LayoutState {
    showDrawer: boolean;
}

const initialState: LayoutState = {
    showDrawer: true
};

export function layoutReducer(state = initialState, action: layout.LayoutActions): LayoutState {
    switch (action.type) {
        case layout.LayoutActionTypes.CLOSE_DRAWER:
            return {
                showDrawer: false
            };

        case layout.LayoutActionTypes.OPEN_DRAWER:
            return {
                showDrawer: true
            };

        default:
            return state;
    }
}

export const getShowDrawer = (state: LayoutState) => state.showDrawer;
