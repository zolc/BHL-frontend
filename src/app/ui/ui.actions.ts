import { Action } from '@ngrx/store';

export const SHOW_SIDEBAR = '[UI] Show sidebar';
export const HIDE_SIDEBAR = '[UI] Hide sidebar';

export class ShowSidebarAction implements Action {
  readonly type = SHOW_SIDEBAR;
}

export class HideSidebarAction implements Action {
  readonly type = HIDE_SIDEBAR;
}

export type Actions
  = ShowSidebarAction
  | HideSidebarAction;
