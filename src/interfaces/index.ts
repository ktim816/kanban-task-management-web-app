export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  status?: string;
  description: string;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  color: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  path: string;
  name: string;
  columns: Column[];
}
