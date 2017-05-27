import { Task } from './task';

export interface Group {
  _id: string;
  name: string;
  completed_tasks: Task[];
  uncompleted_tasks: Task[];
}
