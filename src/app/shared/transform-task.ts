import { Task } from '../models/task';

export function transformTask(task: Task) {
  return Object.assign({}, task, {
    published_date_native: new Date(task.published_date),
    due_date_native: task.due_date ? new Date(task.due_date) : null,
    expanded: false
  });
}
