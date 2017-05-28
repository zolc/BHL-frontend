import { Action, ActionReducer } from '@ngrx/store';
import * as GroupsActions from './groups.actions';

import { environment } from '../../environments/environment';

import { Errors } from '../shared/errors';
import { ProcessStatus } from '../shared/process-status.enum';
import { User } from '../models/user';
import { Group } from '../models/group';

export interface GroupsState {
  loadStatus: ProcessStatus;
  loadErrors: Errors;

  groups: Group[];
}

const initialState: GroupsState = {
  loadStatus: ProcessStatus.Idle,
  loadErrors: null,

  groups: null
};

export function groupsReducer(state = initialState, action: GroupsActions.Actions): GroupsState {
  switch (action.type) {
    case GroupsActions.LOAD_GROUPS:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.InProgress,
        loadErrors: null
      });

    case GroupsActions.LOAD_GROUPS_SUCCESS:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.Success,
        groups: action.payload
      });

    case GroupsActions.LOAD_GROUPS_ERROR:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.Error,
        loadErrors: action.payload
      });

    default:
      return state;
  }
}
