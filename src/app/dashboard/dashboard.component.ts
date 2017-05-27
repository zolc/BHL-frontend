import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as DashboardActions from './dashboard.actions';
import { DashboardState } from './dashboard.reducer';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  dashboardState$: Observable<DashboardState>;

  constructor(private _dashboardStore: Store<DashboardState>) {
    this.dashboardState$ = _dashboardStore.select('dashboard');
  }

  ngOnInit() {
    this._dashboardStore.dispatch(new DashboardActions.LoadDashboardAction());
  }
}
