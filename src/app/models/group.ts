import { Task } from './task';

export interface Group {
  _id: string;
  name: string;
  tasks: Task[];
  completed_tasks: Task[];
  uncompleted_tasks: Task[];
}
