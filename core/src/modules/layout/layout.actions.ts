import { Action } from '@ngrx/store';
import { type } from '../../util';

export const LayoutActionTypes = {
    OPEN_DRAWER:   type('[Layout] Open Drawer'),
    CLOSE_DRAWER:  type('[Layout] Close Drawer')
};

export class OpenDrawerAction implements Action {
    type = LayoutActionTypes.OPEN_DRAWER;
}

export class CloseDrawerAction implements Action {
    type = LayoutActionTypes.CLOSE_DRAWER;
}

export type LayoutActions
    = OpenDrawerAction
    | CloseDrawerAction;