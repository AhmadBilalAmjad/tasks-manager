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

export type TAddEditForm = {
  title: string;
  description: string;
  kpis: string;
  priority: 'high' | 'medium' | 'low';
};

export type TTaskComponent = {
  task: TTask;
  setSelectedTask?: SetStateAction<TTask>;
  fromCompleteTasksModal?: boolean;
  setIsViewTaskModalOpen?: SetStateAction<TTask>;
  setIsAddEditTaskModalOpen?: SetStateAction<TTask>;
};

export type TTaskModal = {
  task?: TTask | undefined;
  visible: boolean;
  toggleVisible: SetStateAction<boolean>;
  setSelectedTask?: SetStateAction<TTask>;
  setIsAddEditTaskModalOpen?: SetStateAction<TTask>;
};
