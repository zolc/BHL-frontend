import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { DashboardState } from '../dashboard.reducer';
import * as DashboardActions from '../dashboard.actions';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task-row',
  templateUrl: 'task-row.component.html',
  styleUrls: ['task-row.component.scss']
})

export class TaskRowComponent implements OnInit {
  private dashboardState$: Observable<DashboardState>;
  @Input() task: Task = null;
  @Input() index = 0;

  @Output() taskDone = new EventEmitter<{ task: Task, index: number}>();

  constructor(
    private _dashboardStore: Store<DashboardState>
  ) {
    this.dashboardState$ = _dashboardStore.select('dashboard');
  }

  ngOnInit() { }

  toggleTask(task: Task, event: MouseEvent) {
    task.expanded = !task.expanded;
  }

  toggleTaskDone(task: Task) {
    this.taskDone.emit({
      task: task,
      index: this.index
    });
  }
}
