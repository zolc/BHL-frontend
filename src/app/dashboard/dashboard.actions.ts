import { Action } from '@ngrx/store';

import { Errors } from '../shared/errors';

import { Task } from '../models/task';


export const LOAD_DASHBOARD = '[Dashboard] Load';
export const LOAD_DASHBOARD_SUCCESS = '[Dashboard] Load success';
export const LOAD_DASHBOARD_ERROR = '[Dashboard] Load error';

export const COMPLETE_TASK = '[Dashboard] Complete task';

export class LoadDashboardAction implements Action {
  readonly type = LOAD_DASHBOARD;
}

export class LoadDashboardSuccessAction implements Action {
  readonly type = LOAD_DASHBOARD_SUCCESS;

  constructor(public payload: Task[]) { }
}

export class LoadDashboardErrorAction implements Action {
  readonly type = LOAD_DASHBOARD_ERROR;

  constructor(public payload: Errors) { }
}

export class CompleteTaskAction implements Action {
  readonly type = COMPLETE_TASK;

  constructor(public payload: Task) { }
}


export type Actions
  = LoadDashboardAction
  | LoadDashboardSuccessAction
  | LoadDashboardErrorAction
  | CompleteTaskAction;
