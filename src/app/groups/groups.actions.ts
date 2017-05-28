import { Action } from '@ngrx/store';

import { Group } from '../models/group';
import { Errors } from '../shared/errors';

export const LOAD_GROUPS = '[Groups] Load';
export const LOAD_GROUPS_SUCCESS = '[Groups] Load success';
export const LOAD_GROUPS_ERROR = '[Groups] Load error';


export class LoadGroupsAction implements Action {
  readonly type = LOAD_GROUPS;
}

export class LoadGroupsSuccessAction implements Action {
  readonly type = LOAD_GROUPS_SUCCESS;

  constructor(public payload: Group[]) { }
}

export class LoadGroupsErrorAction implements Action {
  readonly type = LOAD_GROUPS_ERROR;

  constructor(public payload: Errors) { }
}

export type Actions
  = LoadGroupsAction
  | LoadGroupsErrorAction
  | LoadGroupsSuccessAction;
