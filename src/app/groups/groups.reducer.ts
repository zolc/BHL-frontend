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


  singleGroupLoadStatus: ProcessStatus;
  singleGroupLoadErrors: Errors;
  singleGroup: Group;
}

const initialState: GroupsState = {
  loadStatus: ProcessStatus.Idle,
  loadErrors: null,

  groups: null,

  singleGroupLoadStatus: ProcessStatus.Idle,
  singleGroupLoadErrors: null,
  singleGroup: null
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

    case GroupsActions.LOAD_SINGLE_GROUP:
      return Object.assign({}, state, {
        singleGroupLoadStatus: ProcessStatus.InProgress,
        singleGroupLoadErrors: null
      });

    case GroupsActions.LOAD_SINGLE_GROUP_SUCCESS:
      return Object.assign({}, state, {
        singleGroupLoadStatus: ProcessStatus.Success,
        singleGroup: action.payload
      });

    case GroupsActions.LOAD_SINGLE_GROUP_ERROR:
      return Object.assign({}, state, {
        singleGroupLoadStatus: ProcessStatus.Error,
        singleGroupLoadErrors: action.payload
      });

    default:
      return state;
  }
}
