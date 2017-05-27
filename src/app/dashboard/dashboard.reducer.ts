import { Action, ActionReducer } from '@ngrx/store';
import * as DashboardActions from './dashboard.actions';

import { environment } from '../../environments/environment';

import { Errors } from '../shared/errors';
import { ProcessStatus } from '../shared/process-status.enum';

import { Task } from '../models/task';

export interface DashboardState {
  loadStatus: ProcessStatus;
  loadErrors: Errors;

  dashboardTasks: Task[];
}

const initialState: DashboardState = {
  loadStatus: ProcessStatus.Idle,
  loadErrors: null,

  dashboardTasks: null
};


export function dashboardReducer(state = initialState, action: DashboardActions.Actions): DashboardState {
  switch (action.type) {
    case DashboardActions.LOAD_DASHBOARD:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.InProgress
      });

    case DashboardActions.LOAD_DASHBOARD_SUCCESS:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.Success,
        dashboardTasks: action.payload
      });

    case DashboardActions.LOAD_DASHBOARD_ERROR:
      return Object.assign({}, state, {
        loadStatus: ProcessStatus.Error,
        loadErrors: action.payload
      });

    default:
      return state;
  }
}
