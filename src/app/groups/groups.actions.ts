import { Action } from '@ngrx/store';

import { Group } from '../models/group';
import { Errors } from '../shared/errors';

export const LOAD_GROUPS = '[Groups] Load';
export const LOAD_GROUPS_SUCCESS = '[Groups] Load success';
export const LOAD_GROUPS_ERROR = '[Groups] Load error';

export const LOAD_SINGLE_GROUP = '[Groups] Load single group';
export const LOAD_SINGLE_GROUP_SUCCESS = '[Groups] Load single group success';
export const LOAD_SINGLE_GROUP_ERROR = '[Groups] Load single group error';


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


export class LoadSingleGroupAction implements Action {
  readonly type = LOAD_SINGLE_GROUP;

  constructor(public payload: string) { }
}

export class LoadSingleGroupSuccessAction implements Action {
  readonly type = LOAD_SINGLE_GROUP_SUCCESS;

  constructor(public payload: Group) { }
}

export class LoadSingleGroupErrorAction implements Action {
  readonly type = LOAD_SINGLE_GROUP_ERROR;

  constructor(public payload: Errors) { }
}

export type Actions
  = LoadGroupsAction
  | LoadGroupsErrorAction
  | LoadGroupsSuccessAction
  | LoadSingleGroupAction
  | LoadSingleGroupErrorAction
  | LoadSingleGroupSuccessAction;
