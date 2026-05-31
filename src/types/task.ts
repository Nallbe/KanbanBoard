export type TaskStatus =
  | 'todo'
  | 'inProgress'
  | 'done';

export type MoveSide =
  | 'forward'
  | 'back'


export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
}
