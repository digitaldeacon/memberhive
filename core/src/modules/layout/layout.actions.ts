import { Action } from '@ngrx/store';
import { type } from '../../util';

export const layoutActionTypes: any = {
    OPEN_DRAWER:   type('[Layout] Open Drawer'),
    CLOSE_DRAWER:  type('[Layout] Close Drawer')
};

export class OpenDrawerAction implements Action {
    type: any = layoutActionTypes.OPEN_DRAWER;
}

export class CloseDrawerAction implements Action {
    type: any = layoutActionTypes.CLOSE_DRAWER;
}

export type LayoutActions
    = OpenDrawerAction
    | CloseDrawerAction;
