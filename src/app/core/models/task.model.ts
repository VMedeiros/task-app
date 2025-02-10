export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskFilter {
  title: string;
  completed: string;
}
