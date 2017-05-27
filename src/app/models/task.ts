export interface Task {
  _id: string;
  title: string;
  description: string;
  published_date: string;
  done: boolean;
  due_date: string;
  highlighted: boolean;
}
