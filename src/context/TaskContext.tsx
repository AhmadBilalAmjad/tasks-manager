import React, { useState, createContext, useContext } from 'react';
import { TTask, ITaskContext } from '../types/task';

const TaskContext = createContext<ITaskContext>({
  tasks: [],
  handleAddTask: () => {},
  handleUpdateTask: () => {},
  handleDeleteTask: () => {},
  handleCompleteTask: () => {},
});

export const useTaskContext = () => {
  return useContext<ITaskContext>(TaskContext);
};

const TaskContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<TTask[]>([]);

  const handleAddTask = (task: TTask) => {
    const newTask: TTask = {
      ...task,
      id: Math.random(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleUpdateTask = (t: TTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task: TTask) => (task.id === t.id ? { ...t } : task))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task: TTask) => task.id !== id));
  };

  const handleCompleteTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task: TTask) =>
        task.id === id ? { ...task, isCompleted: true } : task
      )
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleCompleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContextProvider;
