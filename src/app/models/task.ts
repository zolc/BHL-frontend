import { Group } from './group';

export interface Task {
  _id: string;
  title: string;
  description: string;
  published_date: string;
  published_date_native?: Date;
  done: boolean;
  due_date: string;
  highlighted: boolean;
  group: Group;
  expanded: boolean;
}
