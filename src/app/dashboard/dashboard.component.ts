import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as DashboardActions from './dashboard.actions';
import { DashboardState } from './dashboard.reducer';

import { ProcessStatus } from '../shared/process-status.enum';

import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  ProcessStatus = ProcessStatus;
  dashboardState$: Observable<DashboardState>;

  constructor(private _dashboardStore: Store<DashboardState>) {
    this.dashboardState$ = _dashboardStore.select('dashboard');
  }

  ngOnInit() {
    this._dashboardStore.dispatch(new DashboardActions.LoadDashboardAction());
  }

  onTaskDone(task: Task, index: number) {
    this._dashboardStore.dispatch(new DashboardActions.CompleteTaskAction(task));
  }
}
