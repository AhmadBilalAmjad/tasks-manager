export interface ITaskContext {
  tasks: TTask[];
  handleAddTask: (task: TTask) => void;
  handleUpdateTask: (task: TTask) => void;
  handleDeleteTask: (id: number) => void;
  handleCompleteTask: (id: number) => void;
}

export type TTask = {
  id: number;
  title: string;
  description: string;
  kpis: string;
  priority: 'high' | 'medium' | 'low';
  isCompleted: boolean;
};

export type TTaskComponent = {
  task: TTask;
  setSelectedTask?: SetStateAction<TTask>;
};
