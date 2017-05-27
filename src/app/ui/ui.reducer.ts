import { Action, ActionReducer } from '@ngrx/store';
import * as UIActions from './ui.actions';

export interface UIState {
  sidebarHidden: boolean;
}

const initialState: UIState = {
  sidebarHidden: true
}

export function uiReducer(state = initialState, action: UIActions.Actions): UIState {
  switch (action.type) {
    case UIActions.SHOW_SIDEBAR:
      return Object.assign({}, state, {
        sidebarHidden: false
      });

    case UIActions.HIDE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarHidden: true
      });

    default:
      return state;
  }
}
