import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Task } from '../../models/task';

@Component({
  selector: 'app-task-row',
  templateUrl: 'task-row.component.html',
  styleUrls: ['task-row.component.scss']
})

export class TaskRowComponent implements OnInit {
  @Input() task: Task = null;
  @Input() index = 0;

  @Output() taskDone = new EventEmitter<{ task: Task, index: number}>();

  constructor(
  ) {
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
